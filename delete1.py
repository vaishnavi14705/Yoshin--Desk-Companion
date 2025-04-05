import pandas as pd
import random

def generate_synthetic_data(n=100000):
    data = []

    for _ in range(n):
        face_detected = random.choices([0, 1], weights=[0.2, 0.8])[0]  # 20% no face, 80% face detected

        if face_detected == 0:
            # Idle Class (No face detected)
            head_tilt_angle = round(random.uniform(20, 40), 2)  # Random high tilt
            shoulder_position = round(random.uniform(0.1, 0.4), 2)  # Lower shoulder position
            posture_label = "Idle"
        else:
            # Face detected (Either Working or Distracted)
            head_tilt_angle = round(random.uniform(0, 30), 2)  # Range of head tilt angles
            shoulder_position = round(random.uniform(0.4, 1.0), 2)  # Higher shoulder position

            if head_tilt_angle < 10 and shoulder_position > 0.7:
                posture_label = "Working"
            else:
                posture_label = "Distracted"

            # Introduce small noise: randomly flip label in 5% of cases
            if random.random() < 0.05:
                posture_label = random.choice(["Working", "Distracted"])

        data.append([face_detected, head_tilt_angle, shoulder_position, posture_label])

    # Convert to DataFrame
    df = pd.DataFrame(data, columns=['face_detected', 'head_tilt_angle', 'shoulder_position', 'posture_label'])

    # Save to CSV
    df.to_csv("behavior_dataset.csv", index=False)
    print("✅ Noisy synthetic dataset saved as 'behavior_dataset.csv'")

# Generate the dataset with 100,000 samples
generate_synthetic_data(100000)
