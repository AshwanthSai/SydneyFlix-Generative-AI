import alanBtn from '@alan-ai/alan-sdk-web';
import React, { useContext, useEffect, useState } from "react";
import { ColorModeContext } from '../utils/ToggleColorMode';

// useAlan is a custom Hook.

const useAlan = () => {
    const {setmode} = useContext(ColorModeContext);
    const {command, setCommand} = useState("");
    // useEffect(() => {console.log(command)}, [command])
    useEffect(() => {
        alanBtn({
            key: "1ec889d4ad228647f67abd4d7f8ac7cb2e956eca572e1d8b807a3e2338fdd0dc/stage",
            host: 'v1.alan.app',
            onConnectionStatus: function(status) {
              console.log("The status is " + status);
            },          
            onCommand: function(commandData){
                alert("This is -> ", commandData) 
                if (commandData.command === 'test') {
                  alert("Test", commandData)
                }
                if (commandData.command === 'go:back') {
                  alert("This is -> ", commandData)
                }
            }, 
            onEvent: function (e) {
                switch (e.name) {
                  case "recognized":
                    console.info('Interim results:', e);
                    break;
                  case "parsed":
                    console.info('Final result:', e);
                    break;
                  case "text":
                    console.info('Alan AI reponse:', e);
                    break;
                  default:
                    console.info('Unknown event');
                }
            },
            });
      }, []);
};

export default useAlan;
