from transformers import AutoModelForSequenceClassification
from transformers import AutoTokenizer
import torch
import numpy as np

model_name = 'microsoft/xtremedistil-l6-h256-uncased'
new_tokenizer = AutoTokenizer.from_pretrained(model_name)
try:
    new_model = AutoModelForSequenceClassification.from_pretrained('D:/UWB/iCare/Jupyter notebooks/05 May/microsoft xtremedistil-l6-h256-uncased/with sampling v2/ER model microsoft/xtremedistil-l6-h256-uncased sampled/')
    # Replace 'model_name' with the actual name of the model you want to load
except Exception as e:
    # Handle the exception or simply print an error message
    print(f"Error loading the model: {e}")
    new_model = None
    
def predict_er(text):
    """
    Predict the Emotional Reaction score using a pre-trained model.

    Args:
        text (str): Input text to be classified.

    Returns:
        int: Predicted Emotional Reaction score.
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


# Uncomment the following line to test the 'predict_er' function
# text = "Seeker post: Always feel like I'm criticized mocked even when I am alone.... anyone else experience this?<>  Response post: I think it's social anxiety, that creates paranoid feelings , unless I'm wrong but that's how I feel"
# predict_er(text)
