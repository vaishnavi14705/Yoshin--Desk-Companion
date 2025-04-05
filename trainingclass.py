from sklearn.neural_network import MLPClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
import joblib
import pandas as pd

# Load dataset
df = pd.read_csv('  behavior_dataset.csv')

# Drop any rows with missing values (e.g., Idle samples with None)
df.dropna(inplace=True)

# Define features and labels
X = df[['face_detected', 'head_tilt_angle', 'shoulder_position']]
y = df['posture_label']  # Already 0=Working, 1=Distracted, 2=Idle

# Feature scaling for better neural net performance
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(
    X_scaled, y, test_size=0.2, random_state=42
)

# MLP Classifier (Neural Network)
mlp_model = MLPClassifier(hidden_layer_sizes=(128, 64, 32), activation='relu',
                          solver='adam', max_iter=500, random_state=42)

# Train the model
mlp_model.fit(X_train, y_train)

# Evaluate
y_pred = mlp_model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)

print("✅ Model Training Complete (Neural Network)")
print(f"🎯 Accuracy: {accuracy:.2f}")

# Save the model
joblib.dump(mlp_model, 'behavior_model.pkl')
joblib.dump(scaler, 'scaler.pkl')  # Also save the scaler
