/* typeCast keyboard API for Mapping physical keyboard to different layouts
 *
 */

"use strict"



function typeCast(layout) {


  Materialize.toast("Target set to : " + layout, 3000,"rounded orange");
  Materialize.toast("Press Esc to toggle keyboard", 3000,"rounded" );




  //All globals
  var key, x, y = "";

  let currentClient, uLayout = "", tLayout = "", outp = "";
  let typeCastKeyboard = false, caps = false, alt = false, shift = false;
  let indx = "", row = "", pos = "";


  //Client Config class to store client specific details
  // storing some of the interesting properties from navigator object to a clientConfig object
  function getClientDetails() {
    class clientConfig {
      constructor() {
        //get defaults from navigator object
        this.language = navigator.language;
        this.languagesAvail = navigator.languages;
        this.userAgent = navigator.userAgent;
      }

    }

    currentClient = new clientConfig();

  }

  //Step0: get client details can be useful during client testing
  getClientDetails();


  //Step1: Identify user template assume US-en for iterations 
  //load user layout from the language set in the browser   
  loadUserLayout(currentClient.language);




  //Step2: Runn Init() 
  //register event handlers
  //Global switch for the keyboard

  function init() {
    // $(window).on('keydown','keydownHandler');
    // $(window).on('keypress','keypressHandler'); 
    // $(window).on('keyup','keyupHandler');
    
    // $(window).keypress(keypressHandler);
    // $(window).keyup(keyupHandler);

    window.addEventListener("keydown", keydownHandler, false);
    window.addEventListener("keypress", keypressHandler, false);
    window.addEventListener("keyup", keyupHandler, false);
  }

  init();

  //Step 2.1: Listen for the switch and listen when only required
  //disable event bubbling and default behaviour

  //reusable toggle function takes boolean input and returns a boolean
  function toggle(key) {

    if (key === false) {
      return key = true;

    }
    else if (key === true) {

      return key = false;
    }
  }



  function keyupHandler(event) {

    //if esc is pressed toggle keyboard
    //Switch keyboard On/Off 

    if (event.keyCode === 192) { //on the keyUp Event of Esc key  
      typeCastKeyboard = toggle(typeCastKeyboard);
      Materialize.toast("typCast is :" + typeCastKeyboard, 3000); // Show on screen typeCast keyboard bool --



    }

    //when keyboard is ON get caps key state
    if (typeCastKeyboard && event.keyCode === 20) {
      caps = event.getModifierState("CapsLock");
      Materialize.toast("Capslock is :" + caps, 5000); // Show on screen Caps bool --

    }






  }


  function keydownHandler(event) {

  }



  function keypressHandler(event) {



    //only capture key codes and not modifier keys
    //only capture events when keyboard is on
    if (typeCastKeyboard) {
      event.stopPropagation();    //Avoid event bubbling
      event.preventDefault();     //Prevent user inputs to text box ..Check for mobile inputs

      //proceed further to change text from here;

      //Step3: Load the target template from a URL -- add AJAX call to the JSON file -- use local json or JS files -- Cache as web Worker for offline access
      getTargetLayout(layout);
      //get the layout from the main function parameter

      //Step4: Run mapLayout function(with user and target layouts) Map the user layout to target layout
      let inp = {
        which: event.which,
        alt: alt,
        charCode: event.charCode,
        code: event.code,
        ctrlKey: event.ctrlKey,
        key: event.key,
        keyCode: event.keyCode,
        location: event.location,
        shiftKey: event.shiftKey,
        srcElement: event.srcElement,
        target: event.target,
        timeStamp: event.timeStamp,
        capsKey: caps



      }


      //intialise with exiting text on the input / src field
      //assign the new value from our layout mapping
      outp = inp.srcElement.value + mapLayout(inp, uLayout, tLayout)[0]; //get the first index ie the output
      inp.target.value = outp;

      key = mapLayout(inp, uLayout, tLayout)[0];
      x = mapLayout(inp, uLayout, tLayout)[1];
      y = mapLayout(inp, uLayout, tLayout)[2];

      Materialize.toast(key, 500);
      return [key, x, y];

      //Step5: Print on the <event.target> element (no need to specify input elements) on the text field



    }
    else if (false) { //<-- condition to inhibit
      //Inhibit function
      //remove Handler when not in use make sure about removing keypress handler here

      // window.removeEventListener("keydown", keydownHandler, false);

    }



  }





  function loadUserLayout(browserLang) {
    // Use a AJAX request here to fetch a JSON file from server // load only the ones required
    //create a instance of class for each of the available layouts
    //set userLayout and targetlayouts



    ///Use this area to add more user languages and or layouts the values in here are being mapped to 
    //the target layout ..make sure the input and target layouts match
    let userLayout = {
      'en': {
        'name': 'en',
        'lang': ['all'],
        'normal': [
          '` 1 2 3 4 5 6 7 8 9 0 - = \u0008',
          '\u0009 q w e r t y u i o p [ ] \\',
          'a s d f g h j k l ; \' \u000A',
          '{shift} z x c v b n m , . / {shift}',
          '{accept} {alt} {space} {alt} {cancel}'
        ],
        'shift': [
          '~ ! @ # $ % ^ & * ( ) _ + \u0008',
          '\u0009 Q W E R T Y U I O P { } |',
          'A S D F G H J K L : " \u000A',
          '{shift} Z X C V B N M < > ? {shift}',
          '{accept} {alt} {space} {alt} {cancel}'
        ],
        'caps': [
          '` 1 2 3 4 5 6 7 8 9 0 - = \u0008',
          '\u0009 Q W E R T Y U I O P [ ] \\',
          'A S D F G H J K L ; \' \u000A',
          '{shift} Z X C V B N M , . / {shift}',
          '{accept} {alt} {space} {alt} {cancel}'
        ]

      },
      'en-CA': {
        'name': 'en-CA',
        'lang': ['all'],
        'normal': [
          '` 1 2 3 4 5 6 7 8 9 0 - = \u0008',
          '\u0009 q w e r t y u i o p [ ] \\',
          'a s d f g h j k l ; \' \u000A',
          '{shift} z x c v b n m , . / {shift}',
          '{accept} {alt} {space} {alt} {cancel}'
        ],
        'shift': [
          '~ ! @ # $ % ^ & * ( ) _ + \u0008',
          '\u0009 Q W E R T Y U I O P { } |',
          'A S D F G H J K L : " \u000A',
          '{shift} Z X C V B N M < > ? {shift}',
          '{accept} {alt} {space} {alt} {cancel}'
        ],
        'caps': [
          '` 1 2 3 4 5 6 7 8 9 0 - = \u0008',
          '\u0009 Q W E R T Y U I O P [ ] \\',
          'A S D F G H J K L ; \' \u000A',
          '{shift} Z X C V B N M , . / {shift}',
          '{accept} {alt} {space} {alt} {cancel}'
        ]

      },
      'en-US': {
        'name': 'en-US',
        'lang': ['all'],
        'normal': [
          '` 1 2 3 4 5 6 7 8 9 0 - = \u0008',
          '\u0009 q w e r t y u i o p [ ] \\',
          'a s d f g h j k l ; \' \u000A',
          '{shift} z x c v b n m , . / {shift}',
          '{accept} {alt} {space} {alt} {cancel}'
        ],
        'shift': [
          '~ ! @ # $ % ^ & * ( ) _ + \u0008',
          '\u0009 Q W E R T Y U I O P { } |',
          'A S D F G H J K L : " \u000A',
          '{shift} Z X C V B N M < > ? {shift}',
          '{accept} {alt} {space} {alt} {cancel}'
        ],
        'caps': [
          '` 1 2 3 4 5 6 7 8 9 0 - = \u0008',
          '\u0009 Q W E R T Y U I O P [ ] \\',
          'A S D F G H J K L ; \' \u000A',
          '{shift} Z X C V B N M , . / {shift}',
          '{accept} {alt} {space} {alt} {cancel}'
        ]
      },
      // Any further user layout can be added as below
      // 'en-GB': {
      //   'name': 'en-GB',
      //   'lang': ['all'],
      //   'normal': [
      //     '` 1 2 3 4 5 6 7 8 9 0 - = \u0008',
      //     '\u0009 q w e r t y u i o p [ ] \\',
      //     'a s d f g h j k l ; \' \u000A',
      //     '{shift} z x c v b n m , . / {shift}',
      //     '{accept} {alt} {space} {alt} {cancel}'
      //   ],
      //   'shift': [
      //     '~ ! @ # $ % ^ & * ( ) _ + \u0008',
      //     '\u0009 Q W E R T Y U I O P { } |',
      //     'A S D F G H J K L : " \u000A',
      //     '{shift} Z X C V B N M < > ? {shift}',
      //     '{accept} {alt} {space} {alt} {cancel}'
      //   ]
      // },
      'ru': {
        "name": "ms-Russian",
        "lang": ["ru"],
        "normal": [
          "\u0451 1 2 3 4 5 6 7 8 9 0 - = \u0008",
          "\u0009 \u0439 \u0446 \u0443 \u043a \u0435 \u043d \u0433 \u0448 \u0449 \u0437 \u0445 \u044a \\",
          "\u0444 \u044b \u0432 \u0430 \u043f \u0440 \u043e \u043b \u0434 \u0436 \u044d \u000D",
          "{shift} \\ \u044f \u0447 \u0441 \u043c \u0438 \u0442 \u044c \u0431 \u044e / {shift}",
          "{accept} {space} {cancel}"
        ],
        "shift": [
          "\u0401 ! \" \u2116 ; % : ? * ( ) _ + \u0008",
          "\u0009 \u0419 \u0426 \u0423 \u041a \u0415 \u041d \u0413 \u0428 \u0429 \u0417 \u0425 \u042a /",
          "\u0424 \u042b \u0412 \u0410 \u041f \u0420 \u041e \u041b \u0414 \u0416 \u042d \u000D",
          "{shift} / \u042f \u0427 \u0421 \u041c \u0418 \u0422 \u042c \u0411 \u042e / {shift}",
          "{accept} {space} {cancel}"
        ]
      },
      "fr": {
        'name': 'french-azerty-1',
        'lang': ['fr'],
        'normal': [
          "\u00b2 & \u00e9 \" ' ( - \u00e8 _ \u00e7 \u00e0 ) = \u0008",
          "\u0009 a z e r t y u i o p ^ $",
          "q s d f g h j k l m  \u00f9 * \u000A",
          "{shift} < w x c v b n , ; : ! {shift}",
          "{accept} {alt} {space} {alt} {cancel}"
        ],
        'shift': [
          "{sp:1} 1 2 3 4 5 6 7 8 9 0 \u00b0 + \u0008",
          "\u0009 A Z E R T Y U I O P \u00a8 \u00a3",
          "Q S D F G H J K L M % \u00b5 \u000A",
          "{shift} > W X C V B N ? . / \u00a7 {shift}",
          "{accept} {alt} {space} {alt} {cancel}"
        ]
      }
    }

    uLayout = userLayout[browserLang];

  }


  function getTargetLayout(lang) {


    ///Use this area to add more target languages and or layouts
    var targetLayout = {
      "ru": {
        "name": "ms-Russian",
        "lang": ["ru"],
        "normal": [
          "\u0451 1 2 3 4 5 6 7 8 9 0 - = \u0008",
          "\u0009 \u0439 \u0446 \u0443 \u043a \u0435 \u043d \u0433 \u0448 \u0449 \u0437 \u0445 \u044a \\",
          "\u0444 \u044b \u0432 \u0430 \u043f \u0440 \u043e \u043b \u0434 \u0436 \u044d \u000D",
          "{shift} \\ \u044f \u0447 \u0441 \u043c \u0438 \u0442 \u044c \u0431 \u044e / {shift}",
          "{accept} {space} {cancel}"
        ],
        "shift": [
          "\u0401 ! \" \u2116 ; % : ? * ( ) _ + \u0008",
          "\u0009 \u0419 \u0426 \u0423 \u041a \u0415 \u041d \u0413 \u0428 \u0429 \u0417 \u0425 \u042a /",
          "\u0424 \u042b \u0412 \u0410 \u041f \u0420 \u041e \u041b \u0414 \u0416 \u042d \u000D",
          "{shift} / \u042f \u0427 \u0421 \u041c \u0418 \u0422 \u042c \u0411 \u042e / {shift}",
          "{accept} {space} {cancel}"
        ]
      },
      "rug": {
        "name": "Google-Russian",
        "lang": ["ru"],
        "normal": [
          "\u0451 1 2 3 4 5 6 7 8 9 0 - = \u0008",
          "\u0009 \u0439 \u0446 \u0443 \u043a \u0435 \u043d \u0433 \u0448 \u0449 \u0437 \u0445 \u044a \\",
          "\u0444 \u044b \u0432 \u0430 \u043f \u0440 \u043e \u043b \u0434 \u0436 \u044d \u000D",
          "{shift} \u044f \u0447 \u0441 \u043c \u0438 \u0442 \u044c \u0431 \u044e . {shift}",
          "{accept} {space} {cancel}"
        ],
        "shift": [
          "\u0401 ! \" \u2116 ; % : ? * ( ) _ + \u0008",
          "\u0009 \u0419 \u0426 \u0423 \u041a \u0415 \u041d \u0413 \u0428 \u0429 \u0417 \u0425 \u042a /",
          "\u0424 \u042b \u0412 \u0410 \u041f \u0420 \u041e \u041b \u0414 \u0416 \u042d \u000D",
          "{shift} / \u042f \u0427 \u0421 \u041c \u0418 \u0422 \u042c \u0411 \u042e , {shift}",
          "{accept} {space} {cancel}"
        ],
        'caps': [
          "\u0451 1 2 3 4 5 6 7 8 9 0 - = \u0008",
          "\u0009 \u0419 \u0426 \u0423 \u041a \u0415 \u041d \u0413 \u0428 \u0429 \u0417 \u0425 \u042a /",
          "\u0424 \u042b \u0412 \u0410 \u041f \u0420 \u041e \u041b \u0414 \u0416 \u042d \u000D",
          "{shift} / \u042f \u0427 \u0421 \u041c \u0418 \u0422 \u042c \u0411 \u042e , {shift}",
          "{accept} {space} {cancel}"
        ]
      },
      "ruty": {
        "name": "ms-Russian (Typewriter)",
        "lang": ["ru"],
        "normal": [
          "| \u2116 - / \" : , . _ ? % ! ; \u0008",
          "\u0009 \u0439 \u0446 \u0443 \u043a \u0435 \u043d \u0433 \u0448 \u0449 \u0437 \u0445 \u044a )",
          "\u0444 \u044b \u0432 \u0430 \u043f \u0440 \u043e \u043b \u0434 \u0436 \u044d \u000D",
          "{shift} ) \u044f \u0447 \u0441 \u043c \u0438 \u0442 \u044c \u0431 \u044e / {shift}",
          "{accept} {space} {cancel}"
        ],
        "shift": [
          "+ 1 2 3 4 5 6 7 8 9 0 = \\ \u0008",
          "\u0009 \u0419 \u0426 \u0423 \u041a \u0415 \u041d \u0413 \u0428 \u0429 \u0417 \u0425 \u042a (",
          "\u0424 \u042b \u0412 \u0410 \u041f \u0420 \u041e \u041b \u0414 \u0416 \u042d \u000D",
          "{shift} ( \u042f \u0427 \u0421 \u041c \u0418 \u0422 \u042c \u0411 \u042e / {shift}",
          "{accept} {space} {cancel}"
        ],
        'caps' : [
          "| \u2116 - / \" : , . _ ? % ! ; \u0008",
          "\u0009 \u0419 \u0426 \u0423 \u041a \u0415 \u041d \u0413 \u0428 \u0429 \u0417 \u0425 \u042a (",
          "\u0424 \u042b \u0412 \u0410 \u041f \u0420 \u041e \u041b \u0414 \u0416 \u042d \u000D",
          "{shift} ( \u042f \u0427 \u0421 \u041c \u0418 \u0422 \u042c \u0411 \u042e / {shift}",
          "{accept} {space} {cancel}"
        ]
      },
      "rutyg": {
        "name": "Google Russian (Typewriter)",
        "lang": ["ru"],
        "normal": 
        [
          "ю 1 2 3 4 5 6 7 8 9 0 - ч \u0008",
          "\u0009 я в е р т ы у и о п ш щ э",
          "а с д ф г х й к л ; ' \u000D",
          "{shift} з ь ц ж б н м , . / {shift}",
          "{accept} {space} {cancel}"
        ],
        "shift": [
          "ю ! @ ё Ё ъ Ъ & * ( ) _ Ч \u0008",
          "\u0009 Я В Е Р Т Ы У И О П Ш Щ Э",
          "А С Д Ф Г Х Й К Л : \" \u000D",
          "{shift} З Ь Ц Ж Б Н М < > ? {shift}",
          "{accept} {space} {cancel}"
        ],
        'caps':[
          "ю 1 2 3 4 5 6 7 8 9 0 - ч \u0008",
          "\u0009 Я В Е Р Т Ы У И О П Ш Щ Э",
          "А С Д Ф Г Х Й К Л : \" \u000D",
          "{shift} З Ь Ц Ж Б Н М < > ? {shift}",
          "{accept} {space} {cancel}"
        ]      
      },
      "fr": {
        'name': 'french-azerty-1',
        'lang': ['fr'],
        'normal': [
          "\u00b2 & \u00e9 \" ' ( - \u00e8 _ \u00e7 \u00e0 ) = \u0008",
          "\u0009 a z e r t y u i o p ^ $",
          "q s d f g h j k l m  \u00f9 * {enter}",
          "{shift} < w x c v b n , ; : ! {shift}",
          "{accept} {alt} {space} {alt} {cancel}"
        ],
        'shift': [
          "{sp:1} 1 2 3 4 5 6 7 8 9 0 \u00b0 + \u0008",
          "\u0009 A Z E R T Y U I O P \u00a8 \u00a3",
          "Q S D F G H J K L M % \u00b5 {enter}",
          "{shift} > W X C V B N ? . / \u00a7 {shift}",
          "{accept} {alt} {space} {alt} {cancel}"
        ]
      }
    };
    //get from tyCast.js 
    tLayout = targetLayout[lang];
    
    //Use ajax call to retrive layout
    //A better way to get the layout from a server
    // try
    // { 
    $.ajax({
          dataType: "json",
          url: "http://localhost:3000/layout",
          data: {
            name: lang
          },
          success: function( result ) {
            console.log("Layout read as AJAX ...success");
          },
          complete: function(data){
            // tLayout = (data.responseJSON);
    }
  });
  // }catch(err){
  //   $( "body" ).append( "<li>Error requesting page " + settings.url + "</li>" );
  // }
  };





  //function to find index of a char from the template array
  function getIndexOfChar(arr, k) {
    for (var i = 0; i < arr.length; i++) {
      let index = arr[i].indexOf(k);
      if (index > -1) {
        return [i, index];
      }
    }
  }


  //step4: mapLayout function
  function mapLayout(inp, user, target) {
    let out = "";
    let indx = "";




    //Cases when shift key is on
    if (inp.shiftKey) {
      indx = getIndexOfChar(user.shift, inp.key);

      if (!indx) {

      }
      else {
        let row = indx[0];
        let pos = indx[1];

        out = target.shift[row][pos];

      }

    }


    //cases when caps lock is on
    else if (inp.capsKey) {
      indx = getIndexOfChar(user.caps, inp.key);

      if (!indx) {

      }
      else {
        let row = indx[0];
        let pos = indx[1];

        out = target.caps[row][pos];

      }
    }


    //if all cases fail default to normal
    else {
      indx = getIndexOfChar(user.normal, inp.key); //works



      if (!indx) {
        //Case returns where user input not found in userTemplate / user template mismatch

      }
      else {

        row = indx[0];
        pos = indx[1];

        //send this to the called element
        out = target.normal[row][pos];

      }

    }

    return [out, row, pos];

  }


}