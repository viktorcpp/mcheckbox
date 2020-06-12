
'use strict';

import "core-js";
//import "regenerator-runtime/runtime";
import MCheckbox from './MCheckbox';

function Main(e)
{
    window.mcheckbox = new MCheckbox();

} // Main


function OnLoaded(e)
{
    window.mcheckbox.Init();

} // OnLoaded


window.addEventListener( "DOMContentLoaded", Main );
window.addEventListener( "load",             OnLoaded );
