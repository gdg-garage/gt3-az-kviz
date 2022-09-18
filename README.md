# Garage Trip 3.0
# AZ Kviz

Rconstruction of a popular Czech TV game series with tech topics.

How to run:
* Run the questions server 
  * Install dependencies `pip install -r requirements.txt`
  * Run the server `flask --app questions run -p 8080` 
  * Questions are loaded from `questions.csv`
  * Used questions are marked in `used.csv`
* Open the website `index.html`
  * Moderator is necessary for marking (in)correct answers and determinig the end of the game
  
Have fun and contributions are welcome!

Kudos:
* @davidvavra for the questions
* @jskvara for the layout
