// Select the textarea and button elements from the DOM
const textarea = document.querySelector("textarea");
const button = document.querySelector("button");

// Variable to track speech state
let isSpeaking = true;

// Function to convert text to speech
const textToSpeech = () => {
    // Get the speech synthesis API
    const synth = window.speechSynthesis;
    // Get the text input from the textarea
    const text = textarea.value;

    // If speech synthesis is not already speaking and there's text, start speaking
    if (!synth.speaking && text) {
        const utterance = new SpeechSynthesisUtterance(text);
        synth.speak(utterance);
    };

    // If the text length is greater than 80 characters, handle pause and resume functionality
    if (text.length > 80) {
        if (synth.speaking && isSpeaking) {
            button.innerText = "Pause Speech"; // Change button text to indicate pause action
            synth.resume(); // Resume speech if it was paused
            isSpeaking = false; // Set isSpeaking to false to indicate it's playing
        }
        else {
            button.innerText = "Resume Speech"; // Change button text to indicate resume action
            synth.pause(); // Pause speech
            isSpeaking = true; // Set isSpeaking to true to indicate it's paused
        }
    } else {
        isSpeaking = false; // If text is short, reset isSpeaking
        button.innerText = "Speaking..."; // Change button text to indicate speaking
    }

    // Continuously check if speech has finished and reset button state accordingly
    setInterval(() => {
        if (!synth.speaking && !isSpeaking) {
            isSpeaking = true; // Reset isSpeaking when speech is finished
            button.innerText = "Convert to Speech"; // Reset button text
        }
    });
};

// Add event listener to the button to trigger text-to-speech when clicked
button.addEventListener("click", textToSpeech);
