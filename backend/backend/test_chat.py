import openai
from openai.embeddings_utils import get_embedding, cosine_similarity

api_key = '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'
openai.api_key = api_key

prompt = """Create a message reporting the response posts's score which can be 0,1 or 2(Score: Exploration: 2/2, Interpretation: 2/2, Emotional Rreaction:2/2.)  and giving them suggestions for following response to seeker post by a mental health patient:
Seeker post: I've had a hard time going back to school. Going back to school has been difficult for me, It's been around five years since I've been in a class room and I ask the teachers and the people that I go to my classes to cut me some slack for being rusty but they tell me that it doesn't matter, and my step mom doesn't want me to use the computer because she doesn't want to share. Its lead me to skipping classes because I feel like theirs no use in going to school, it would be cool to know how you would handle this situation and if you can give me any advice.<>  
Response post: sorry to hear that, but been in a similar situation after taking some time off of school. My best advice is to take the minimum amount of classes possible so you do not get too overwhelmed. For me essential to plan my assignments in advance, so that I can just do things one by one and not let it all get piled up cuz then I wanna die. Also, if you need a break, take one. School will always be there but good to take care of yourself too :) """

# Define the prompt and the response post

# Set up the OpenAI GPT-3 API request
model_engine = "text-davinci-002"

def generate_response(prompt):
    completions = openai.Completion.create(
        engine = "text-davinci-003",
        prompt = prompt,
        max_tokens = 1024,
        n = 1,
        stop = None,
        temperature=0.5,
    )
    message = completions.choices[0].text
    return message

prompt = """Create a message reporting the response posts's score which can be 0,1 or 2(Score: Exploration: 2/2, Interpretation: 2/2, Emotional Rreaction:2/2.)  and giving them suggestions for following response to seeker post by a mental health patient:
Seeker post: I've had a hard time going back to school. Going back to school has been difficult for me, It's been around five years since I've been in a class room and I ask the teachers and the people that I go to my classes to cut me some slack for being rusty but they tell me that it doesn't matter, and my step mom doesn't want me to use the computer because she doesn't want to share. Its lead me to skipping classes because I feel like theirs no use in going to school, it would be cool to know how you would handle this situation and if you can give me any advice.<>  
Response post: sorry to hear that, but been in a similar situation after taking some time off of school. My best advice is to take the minimum amount of classes possible so you do not get too overwhelmed. For me essential to plan my assignments in advance, so that I can just do things one by one and not let it all get piled up cuz then I wanna die. Also, if you need a break, take one. School will always be there but good to take care of yourself too :) """

# prompt = """Create a message reporting the response posts's score which can be 0,1 or 2(Score: Exploration: 0/2, Interpretation: 0/2, Emotional Rreaction:0/2.)  and giving them suggestions for following response to seeker post by a mental health patient:Seeker post: miss mum. I'm crying lot today and.I'm really depressed miss mum<>  Response post: Don't talk shit with me. Useless """

print(generate_response("how to use hashmap"))