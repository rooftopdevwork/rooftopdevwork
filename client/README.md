## vanilla webpack build

`npm run begin`
This will bundle all your compoenents into bundle.js
A new page on port 9002 will pop up. Your code will liveReload there but not HMR. A secondary server running express is also serving out of that. That particular server only serves things once and is for eventual deployment. You would have to rebuild everything to see changes in the localhost:4000

development should be done with npm run begin and on port 9000.

Do not copy over above
---
Below are design docs, rewrite at will

Word guessing game
features:

* 1 v cpu
* 1 letter at a time
* the guesser has six guesses.
* secret: jaaacob
  * visual `******`
  * guess: `'a' -> *aaa***`
  * state: `jaaa*ob`
    * guess: `'c' -> 'jaaacob' => win` 
  * state2: '******b`
    * guess#6: `x -> 'jaaac*b' => lose` 
  
Preliminary Behavior/Features
- Form the secret
  - At the **start** of the game the **computer**/secret-keeper will choose a **dictionary** word
- Set the lose conditions
  - The guesser loses the game if they guess 6 letters that are not in the secret word
- Set the win conditions
  - The guesser wins the game if they guess all letters in the secret word correctly and have not already lost the game per the conditions above

## Tools to use.
| Need | Solution | Tech
| - | -| -|
|Form secret |api | Express | 
| Store the secret | database? | mongodb | 
| Session | extra| quickFbase or rollout | 
| | | | 
| | | | 
| | | | 
| | | | 
| | | | 
| | | | 
| | | | 
Gotchas
  * guesses can't be whole words or _
Step by step
* GENERATE WORD
  * API REQUEST TO DICT.COM 
  * ie "formula"
* GET STAGES // the lenght of the word
  * stage: `secret length + 1`
  * stateOfGame `bool` // has the game started?
  * secretword
    * should this word be in the server? it's not a 2 player game. No need to accoutn for cheating. it can be in state. If we ever need to secure it a bit, we can use a uri encode and decoder middleware. 
  * 
    * ```js
      state = {
        currentStage: 8
        hasGameStarted: true
        secretWord: "formula"
        currentGuess: "formula"
      }
      ```
* guessing wrong
  * decreases state
    * ```
      state = {
        currentStage: 7
      }
      ```
* guessing right
  * decreases state "a"
  * updates currentGuess
    * ```
      state = {
        currentStage: 7
        secretWord: "formula",
        currentGuess: "formul_"
      }
      ```
* Set the lose conditions
    * ```
      state = {
      currentStage: 0
      }
      ```
    * The user hsas 7 guesses
      * at stage0, lose condition.
* Set the win conditions
    * ```
      state = {
      currentStage: 0
      secretWord: ""
      }
      ```
    * 
* Actions
  * User submits a guess `submitGuess(guess) => null` 
    * validateGuess(guess) => bool
      * c:false doNothing.
    * Get Secret From State
    * Compare guess to secret `compareGuess(guess) => bool`
      * c:true
        * remove all guesses from secret `removeGuessFromSecret(secret) => string`
    * Check win conditions *

