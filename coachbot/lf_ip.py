from transformers import AutoModelForSequenceClassification
from transformers import AutoTokenizer
import torch
import numpy as np

model_name = 'allenai/longformer-base-4096'
new_tokenizer = AutoTokenizer.from_pretrained(model_name)
try:
    new_model = AutoModelForSequenceClassification.from_pretrained('D:/UWB/iCare/Jupyter notebooks/05 May/longformer-base-4096/with sampling v2/IP model allenai/longformer-base-4096 IP with sampling/')
    # Replace 'model_name' with the actual name of the model you want to load
except Exception as e:
    # Handle the exception or simply print an error message
    print(f"Error loading the model: {e}")
    new_model = None
    
def predict_ip(text):
    """
    Predict the Interpretation score using a pre-trained model.

    Args:
        text (str): Input text to be classified.

    Returns:
        int: Predicted Interpretation score.
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


# Uncomment the following line to test the 'predict_ip' function
# text = "Seeker post: Always feel like I'm criticized mocked even when I am alone.... anyone else experience this?<>  Response post: I think it's social anxiety, that creates paranoid feelings , unless I'm wrong but that's how I feel"
# get_prediction(text)
