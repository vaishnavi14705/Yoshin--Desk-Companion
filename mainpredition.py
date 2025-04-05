import cv2
import joblib
import numpy as np
import pandas as pd
from collections import deque, Counter

# Load model and pre-fit scaler
model = joblib.load('behavior_model.pkl')
scaler = joblib.load('scaler.pkl')

# Simulated feature extractor (replace with real CV logic later)
def extract_features_from_frame(frame):
    face_detected = 1  # Simulate always detected
    head_tilt_angle = round(np.random.uniform(5, 25), 2)
    shoulder_position = round(np.random.uniform(0.5, 0.9), 2)
    return [face_detected, head_tilt_angle, shoulder_position]

# For smoothing predictions
prediction_history = deque(maxlen=7)

# Maps integer labels to posture names
int_label_map = {0: "Working", 1: "Distracted", 2: "Idle"}

# Start webcam
cap = cv2.VideoCapture(0)
print("🎥 Starting real-time posture prediction... Press 'q' to quit.")

while True:
    ret, frame = cap.read()
    if not ret:
        break

    # Extract and scale features
    features = extract_features_from_frame(frame)
    features_df = pd.DataFrame([features], columns=["face_detected", "head_tilt_angle", "shoulder_position"])
    features_scaled = scaler.transform(features_df)

    # Predict
    prediction = model.predict(features_scaled)[0]

    # Add to history
    prediction_history.append(prediction)

    # Smooth prediction
    most_common = Counter(prediction_history).most_common(1)[0][0]

    # Handle both string and integer predictions
    if isinstance(most_common, int):
        label = int_label_map.get(most_common, "Unknown")
    elif isinstance(most_common, str):
        label = most_common
    else:
        label = "Unknown"

    # Display prediction
    cv2.putText(frame, f"Posture: {label}", (20, 30),
                cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)

    cv2.imshow('Posture Detection', frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
