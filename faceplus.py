import cv2
import datetime
import pandas as pd
import mediapipe as mp

# Load the deep learning face detector model
prototxt_path = r"C:\Users\Asus\Desktop\DU_Hack\models\deploy.prototxt"
model_path = r"C:\Users\Asus\Desktop\DU_Hack\models\res10_300x300_ssd_iter_140000.caffemodel"

net = cv2.dnn.readNetFromCaffe(prototxt_path, model_path)

# Initialize MediaPipe Pose Estimation
mp_pose = mp.solutions.pose
pose = mp_pose.Pose()

# Open webcam
cap = cv2.VideoCapture(0)

# CSV file to log timestamps
log_file = "productivity_log.csv"

def log_time(status):
    """Logs the timestamp when a face is detected and posture is good."""
    timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    df = pd.DataFrame([[timestamp, status]], columns=["Timestamp", "Status"])
    df.to_csv(log_file, mode='a', header=False, index=False)
    print(f"📜 Logged: {timestamp} - {status}")

while True:
    ret, frame = cap.read()
    if not ret:
        print("❌ Failed to capture frame!")
        break

    # Get frame dimensions
    (h, w) = frame.shape[:2]

    # Convert frame to blob for DNN processing
    blob = cv2.dnn.blobFromImage(frame, scalefactor=1.0, size=(300, 300),
                                 mean=(104.0, 177.0, 123.0), swapRB=False, crop=False)

    # Run face detection
    net.setInput(blob)
    detections = net.forward()

    face_detected = False

    for i in range(detections.shape[2]):
        confidence = detections[0, 0, i, 2]

        # Confidence threshold (adjust if needed)
        if confidence > 0.5:
            face_detected = True
            box = detections[0, 0, i, 3:7] * [w, h, w, h]
            (startX, startY, endX, endY) = box.astype("int")

            # Draw bounding box
            cv2.rectangle(frame, (startX, startY), (endX, endY), (0, 255, 0), 2)

    # Convert image to RGB for MediaPipe processing
    img_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    result = pose.process(img_rgb)

    posture_status = "Unknown"

    if result.pose_landmarks:
        # Get key points for posture detection
        landmarks = result.pose_landmarks.landmark

        head_x, head_y = int(landmarks[0].x * w), int(landmarks[0].y * h)  # Nose (head)
        shoulder_x, shoulder_y = int(landmarks[11].x * w), int(landmarks[11].y * h)  # Left shoulder

        # Draw points on frame
        cv2.circle(frame, (head_x, head_y), 5, (0, 0, 255), -1)  # Head
        cv2.circle(frame, (shoulder_x, shoulder_y), 5, (255, 0, 0), -1)  # Shoulder

        # Determine if posture is correct
        if head_y > shoulder_y:
            posture_status = "Good Posture - Working"
            color = (0, 255, 0)
        else:
            posture_status = "Bad Posture - Not Working"
            color = (0, 0, 255)

        cv2.putText(frame, posture_status, (50, 50), cv2.FONT_HERSHEY_SIMPLEX, 0.7, color, 2)

    if face_detected:
        log_time(posture_status)

    # Show video feed
    cv2.imshow("Productivity Tracker", frame)

    # Press 'q' to quit
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
