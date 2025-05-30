from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import PassiveAggressiveClassifier

app = Flask(__name__)
CORS(app)

# Initialize the vectorizer and model
vectorizer = TfidfVectorizer(stop_words='english', max_df=0.7)
model = PassiveAggressiveClassifier()

# Sample training data (you should replace this with your actual training data)
train_texts = [
    "This is a real news article about important events",
    "This is fake news spreading misinformation",
    # Add more training examples here
]
train_labels = [1, 0]  # 1 for real, 0 for fake

# Train the model
X_train = vectorizer.fit_transform(train_texts)
model.fit(X_train, train_labels)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        text = data.get('text', '')
        
        if not text:
            return jsonify({'error': 'No text provided'}), 400
        
        # Transform the input text
        X_test = vectorizer.transform([text])
        
        # Make prediction
        prediction = model.predict(X_test)[0]
        confidence = model.decision_function(X_test)[0]
        
        result = {
            'prediction': 'Real' if prediction == 1 else 'Fake',
            'confidence': float(abs(confidence)),
            'text': text
        }
        
        return jsonify(result)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000) 