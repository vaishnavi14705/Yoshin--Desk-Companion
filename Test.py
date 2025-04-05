import cv2
import datetime
import pandas as pd

# Load the deep learning face detector model
prototxt_path = r"C:\Users\Asus\Desktop\DU_Hack\models\deploy.prototxt"
model_path = r"C:\Users\Asus\Desktop\DU_Hack\models\res10_300x300_ssd_iter_140000.caffemodel"

net = cv2.dnn.readNetFromCaffe(prototxt_path, model_path)

# Open webcam
cap = cv2.VideoCapture(0)

# CSV file to log timestamps
log_file = "face_logs.csv"

def log_time():
    """Logs the timestamp when a face is detected."""
    timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    df = pd.DataFrame([[timestamp]], columns=["Timestamp"])
    df.to_csv(log_file, mode='a', header=False, index=False)
    print(f"📜 Logged: {timestamp}")

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

    if face_detected:
        log_time()

    # Show video feed
    cv2.imshow("Face Tracking (DNN)", frame)

    # Press 'q' to quit
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
