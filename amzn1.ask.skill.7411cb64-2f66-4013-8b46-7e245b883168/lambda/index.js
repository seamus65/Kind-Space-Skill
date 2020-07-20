// This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
// Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
// session persistence, api calls, and more.
const Alexa = require('ask-sdk-core');

// Add multiple random greetings to the skill as per : https://developer.amazon.com/blogs/alexa/post/37e732b7-48fa-4940-9f12-9ffde7eeeaf8/alexa-skill-recipe-randomize-your-responses-to-add-variety-to-your-skill
// Array of welcome messages
const welcomeMessages = [
    'Hello my friend and welcome to Kind Space!',
    "Welcome to Kind Space! Hope you're having an awesome day!",
    "Welcome to Kind Space! Hope you had a great day so far!",
    "Hi there, welcome to Kind Space! Hope you're having an awesome day!",
    'Hi there, welcome to Kind Space! Hope you had a great day so far!',
    'Hello there, welcome to Kind Space! Hope you had a great day so far!',
    "Hello there, welcome to Kind Space! Hope you're having an awesome day!"]; 
                        
// Question one list
const questionOne = [
    "I have been thinking clearly and creatively.",
    "I feel calm and content.",
    "I feel full of vitality.",
    "I have been absorbed in what I was doing.",
    "I found it easy to relax.",
    "I am able to do things that I enjoy.",
    "I feel I can go about my day without effort."];
                        
// Question two list
const questionTwo = [
    "I have energy to spare.",
    "I feel active and vigorous.",
    "I have been able to undertake exercise.",
    "I woke up feeling fresh and rested.",
    "I feel well nourished.",
    "I feel well hydrated.",
    "I feel energised by the things I do."];
    
// Question three list
const questionThree = [
    "I smile and laugh a lot.",
    "I can handle any problems that come up.",
    "I feel optimistic about the future.",
    "I feel cheerful and in good spirits.",
    "My day is filled with things that interest me.",
    "I am interested in new things.",
    "I feel excited about what tomorrow will bring."];

// Question four list
const questionFour = [
    "I am content with my friendships and relationships.",
    "I have people I can rely on for help.",
    "I am satisfied with my level of social interaction.",
    "I have someone that I can talk to about the things that are important to me.",
    "My social relationships are supportive and rewarding.",
    "I feel that I can be useful.",
    "I feel good about myself."];             
    
// Check the time of the day:
var date = new Date();
var current_hour = date.getHours();

// Functions:

function randomChoice(myArray) { 
// myArray - the variable passed to the function will be an array of strings
var i = 0;
i = Math.floor(Math.random() * myArray.length);
return(myArray[i]);
}
                        
// Intent handlers below:

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = randomChoice(welcomeMessages)+" You can choose from daily scoring, sleep and exercise.";
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const DailyScoringIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'DailyScoringIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Daily scoring will help you monitor your energy levels. Give a score from one to five where one is not at all and five is all the time. Would you like to continue?';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'You can say hello to me! How can I help?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Goodbye!';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse();
    }
};

// The intent reflector is used for interaction model testing and debugging.
// It will simply repeat the intent the user said. You can create custom handlers
// for your intents by defining them above, then also adding them to the request
// handler chain below.
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

// Generic error handling to capture any syntax or routing errors. If you receive an error
// stating the request handler chain is not found, you have not implemented a handler for
// the intent being invoked or included it in the skill builder below.
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.stack}`);
        const speakOutput = `Sorry, I had trouble doing what you asked. Please try again.`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

// The SkillBuilder acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        DailyScoringIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler, // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    )
    .addErrorHandlers(
        ErrorHandler,
    )
    .lambda();
