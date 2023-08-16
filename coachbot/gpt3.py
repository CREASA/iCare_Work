import openai
from openai.embeddings_utils import get_embedding, cosine_similarity

api_key = ''  # TODO: insert GPT-3 API key
openai.api_key = api_key

def gpt3(er, ex, ip, rp, sp):
    """
    Generate a response using GPT-3 based on the given empathy scores and input texts.

    Args:
        er (int): Emotional Reaction score.
        ex (int): Exploration score.
        ip (int): Interpretation score.
        rp (str): Response post.
        sp (str): Seeker post.

    Returns:
        str: Generated response by GPT-3 or a fallback message.
    """
    message = f"Thank you for sharing your advice. Based on your response, the predicted empathy scores are as follows: Emotional Reaction: {er}/2, Exploration: {ex}/2, and Interpretation: {ip}/2."

    prompt = f"""Create a message reporting the caregiver's response post's score (Emotional Reaction: {er}/2, Exploration: {ex}/2, Interpretation: {ip}/2) and giving them suggestions for improving their response to the seeker post by a mental health patient:
    Seeker post: {sp}
    Response: {rp}
    Please make sure you report the score stated previously."""

    print(prompt)

    try:
        completions = openai.Completion.create(
            engine="text-davinci-003",
            prompt=prompt,
            max_tokens=1024,
            n=1,
            stop=None,
            temperature=0.5,
        )
        message = completions.choices[0].text
    except Exception as e:
        print(f"Error: {e}")
        message = f"Thank you for sharing your advice. Based on your response, the predicted empathy scores are as follows: Emotional Reaction: {er}/2, Exploration: {ex}/2, and Interpretation: {ip}/2."

    return message


# Uncomment the following lines to test the 'gpt3' function
# if __name__ == '__main__':
#     sp = "Literally no friends. I don't know how to interact with other people, I don't have a single friend, and humans can't live like this. Seems like people can just smell the depression and anxiety on me and they stay away. Wish I had the courage to end it."
#     rp = "Have you tried exploring out of your circle of people? I've had trouble making friends too but I found that when I put myself out there by taking a part-time job or some sorts, I ended up meeting new people who aren't all that bad actually. As for the depression and anxiety, have you seen someone for that?"
#     print(gpt3(2, 0, 2, sp, rp))
