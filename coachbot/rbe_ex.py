from transformers import AutoModelForSequenceClassification
from transformers import AutoTokenizer
import torch
import numpy as np

model_name = 'cardiffnlp/twitter-roberta-base-sentiment'
new_tokenizer = AutoTokenizer.from_pretrained(model_name)
try:
    new_model = AutoModelForSequenceClassification.from_pretrained('D:/UWB/iCare/Jupyter notebooks/04 April/roberta-base-empathy/sampling/EX cardiffnlp/twitter-roberta-base-sentiment with sampling/')
    # Replace 'model_name' with the actual name of the model you want to load
except Exception as e:
    # Handle the exception or simply print an error message
    print(f"Error loading the model: {e}")
    new_model = None
    
def predict_ex(text):
    """
    Predict the Exploration score using a pre-trained model.

    Args:
        text (str): Input text to be classified.

    Returns:
        int: Predicted Exploration score.
    """
    if (new_model == None):
       return  None
   
    encoding = new_tokenizer(text, return_tensors="pt", padding="max_length", truncation=True, max_length=128)
    encoding = {k: v.to(new_model.device) for k, v in encoding.items()}

    outputs = new_model(**encoding)

    logits = outputs.logits

    sigmoid = torch.nn.Sigmoid()
    probs = sigmoid(logits.squeeze().cpu())
    probs = probs.detach().numpy()
    label = np.argmax(probs, axis=-1)
    return label.item()

# Uncomment the following line to test the 'predict_ex' function
# get_prediction(text)
