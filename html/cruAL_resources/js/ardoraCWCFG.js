//Creado con Ardora - www.webardora.net
//bajo licencia Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0)
//para otros usos contacte con el autor
var timeAct=314; timeIni=314; timeBon=0;
var successes=0; successesMax=1; attempts=0; attemptsMax=4;
var score=0; scoreMax=1; scoreInc=1; scoreDec=0;
var typeGame=0;
var tiTime=false;
var tiTimeType=0;
var tiButtonTime=true;
var textButtonTime="Comenzar";
var tiSuccesses=true;
var tiAttempts=true;
var tiScore=true;
var startTime; var tiAudio=false;
var colorBack="#FFFDFD"; colorButton="#91962F"; colorText="#000000"; colorSele="#FF8000";
var goURLNext=false; goURLRepeat=false;tiAval=false;
var scoOk=0; scoWrong=0; scoOkDo=0; scoWrongDo=0; scoMessage=""; scoPtos=10;
var fMenssage="Verdana, Geneva, sans-serif";
var fActi="Verdana, Geneva, sans-serif";
var fDefs="Verdana, Geneva, sans-serif";
var fEnun="Verdana, Geneva, sans-serif";
var timeOnMessage=5; messageOk="Felicidades excelente trabajo"; messageTime=""; messageError=""; messageErrorG=""; messageAttempts=""; isShowMessage=false;
var urlOk=""; urlTime=""; urlError=""; urlAttempts="";
var goURLOk="_blank"; goURLTime="_blank"; goURLAttempts="_blank"; goURLError="_blank"; 
borderOk="#008000"; borderTime="#FF0000";borderError="#FF0000"; borderAttempts="#FF0000";
var wordsGame="Y3J1QUw="; wordsStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
function giveZindex(typeElement){var valueZindex=0; capas=document.getElementsByTagName(typeElement);
for (i=0;i<capas.length;i++){if (parseInt($(capas[i]).css("z-index"),10)>valueZindex){valueZindex=parseInt($(capas[i]).css("z-index"),10);}}return valueZindex;}
var col=0; row=0; writeDir=0;
var cw=[["Uw==","VQ==","UA==","RQ==","Ug==","SQ==","Tw==","Ug==","","","","","RA==","Tw==","Uw=="],["","RA==","Tw==","Tw==","TA==","SQ==","VA==","VA==","TA==","RQ==","","","","",""],["Qw==","Ug==","QQ==","TQ==","RQ==","Ug==","","Qw==","SA==","Tw==","TA==","RQ==","Uw==","Sw==","WQ=="],["RA==","SQ==","QQ==","Rw==","Tw==","Tg==","QQ==","TA==","","","","","","",""],["","","Rg==","QQ==","Qw==","VA==","Tw==","Ug==","SQ==","Wg==","QQ==","Qw==","SQ==","Tw==","Tg=="],["Rw==","QQ==","VQ==","Uw==","Uw==","Sg==","Tw==","Ug==","RA==","QQ==","Tg==","","","",""],["","","","","Uw==","SQ==","TQ==","RQ==","VA==","Ug==","SQ==","Qw==","QQ==","",""],["","Uw==","VQ==","UA==","RQ==","Ug==","SQ==","Tw==","Ug==","","","","","",""],["","","","","RQ==","Uw==","Qw==","QQ==","TA==","Tw==","Tg==","QQ==","RA==","Tw==",""],["","","SQ==","Tg==","Qw==","Tw==","Rw==","Tg==","SQ==","VA==","QQ==","","","",""],["","","","","","SQ==","Tg==","Vg==","RQ==","Ug==","VA==","SQ==","Qg==","TA==","RQ=="]];
var x1=[1,13,2,1,8,1,3,1,5,2,5,3,6];
var y1=[1,1,2,3,3,4,5,6,7,8,9,10,11];
var x2=[8,15,10,6,15,8,15,11,13,9,14,11,15];
var y2=[1,1,2,3,3,4,5,6,7,8,9,10,11];
var imaCW=["","","","","","","","","","","","",""];
var audioCW=["","","","","","","","","","","","",""];
var defCW=["Ceros debajo de la diagonal","Número de matrices en LU","Factorización LU con diagonal superior unitaria","Usa determinantes para resolver sistemas","Factorización para matrices simétricas positivas","Tipo de matriz en método de Crout","Descomposición matricial","Obtiene la forma escalonada reducida","Igual a su transpuesta","Ceros debajo de la diagonal","Forma reducida por filas","Variable a despejar","Permite usar Cramer"];
var altCW=["","","","","","","","","","","","",""];
var colNum=15;
var rowNum=11;
