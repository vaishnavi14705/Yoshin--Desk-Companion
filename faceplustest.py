import cv2
import pandas as pd
import mediapipe as mp
import os

# Load Face Detection Model
prototxt_path = r"C:\Users\Asus\Desktop\DU_Hack\models\deploy.prototxt"
model_path = r"C:\Users\Asus\Desktop\DU_Hack\models\res10_300x300_ssd_iter_140000.caffemodel"
net = cv2.dnn.readNetFromCaffe(prototxt_path, model_path)

# MediaPipe Pose
mp_pose = mp.solutions.pose
pose = mp_pose.Pose()

# Open Webcam
cap = cv2.VideoCapture(0)

# CSV Dataset
dataset_file = "behavior_dataset.csv"
if not os.path.exists(dataset_file):
    df = pd.DataFrame(columns=["face_detected", "head_tilt_angle", "shoulder_position", "posture_label"])
    df.to_csv(dataset_file, index=False)

def log_data(face_detected, head_y, shoulder_y):
    if head_y is not None and shoulder_y is not None:
        tilt_diff = head_y - shoulder_y
    else:
        tilt_diff = None

    # Assign label
    if not face_detected:
        posture_label = 2  # Idle
    elif tilt_diff and tilt_diff > 15:
        posture_label = 0  # Working
    else:
        posture_label = 1  # Distracted

    # Save to CSV
    df = pd.DataFrame([[int(face_detected), tilt_diff, shoulder_y, posture_label]],
                      columns=["face_detected", "head_tilt_angle", "shoulder_position", "posture_label"])
    df.to_csv(dataset_file, mode='a', header=False, index=False)
    print(f"✅ Logged: Label={posture_label} | Tilt={tilt_diff}")

while True:
    ret, frame = cap.read()
    if not ret:
        break

    h, w = frame.shape[:2]

    # Face Detection
    blob = cv2.dnn.blobFromImage(frame, 1.0, (300, 300), (104.0, 177.0, 123.0), False, False)
    net.setInput(blob)
    detections = net.forward()

    face_detected = False
    for i in range(detections.shape[2]):
        if detections[0, 0, i, 2] > 0.5:
            face_detected = True
            box = detections[0, 0, i, 3:7] * [w, h, w, h]
            startX, startY, endX, endY = box.astype("int")
            cv2.rectangle(frame, (startX, startY), (endX, endY), (0, 255, 0), 2)

    # Pose Detection
    img_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    result = pose.process(img_rgb)

    head_y = shoulder_y = None

    if result.pose_landmarks:
        lm = result.pose_landmarks.landmark
        head_y = int(lm[0].y * h)  # Nose
        shoulder_y = int(lm[11].y * h)  # Left Shoulder

        cv2.circle(frame, (int(lm[0].x * w), head_y), 5, (0, 0, 255), -1)
        cv2.circle(frame, (int(lm[11].x * w), shoulder_y), 5, (255, 0, 0), -1)

    # Log synthetic data
    log_data(face_detected, head_y, shoulder_y)

    cv2.imshow("Synthetic Data Generator", frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
