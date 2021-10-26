<!--  to hide script contents from old browsers

function h_initArray() {
    this.length = h_initArray.arguments.length;
    for (var i = 0; i < this.length; i++)
        this[i] = h_initArray.arguments[i];
}
    
function h_from10toradix(value,radix){
    var retval = '';
    var ConvArray = new h_initArray(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F');
    var intnum;
    var tmpnum;
    var i = 0;

    intnum = parseInt(value,10);
    if (isNaN(intnum)){
        retval = 'NaN';
    }else{
        if (intnum < 1){
            retval ="0";
        }else{
            retval = "";
        }
        while (intnum > 0.9){
            i++;
            tmpnum = intnum;
            // cancatinate return string with new digit:
            retval = ConvArray[tmpnum % radix] + retval;  
            intnum = Math.floor(tmpnum / radix);
            if (i > 100){
                // break infinite loops
                retval = 'NaN';
                break;
            }
        }
    }
    return retval;
}

function h_paddto2(str) {
    while(str.length <2){
        str= "0" + str;
    }
    return(str);
}

function h_paddto8(str) {
    while(str.length <8){
        str= "0" + str;
    }
    return(str);
}

//--------------------------

function h_countbitsfromleft(num)
{
    if (num == 255 ){
        return(8);
    }
    i = 0;
    bitpat=0xff00; 
    while (i < 8){
        if (num == (bitpat & 0xff)){
            return(i);
        }
        bitpat=bitpat >> 1;
        i++;
    }
    return(Number.NaN);
}

function calcNWbits(cform)
{
    sumofbits=0;
    tmpvar = parseInt(cform.snm_1.value,10);
    if (isNaN(tmpvar)){
        cform.result.value = '无效';
        return;
    }
    bitsfromleft=h_countbitsfromleft(tmpvar);
    if (isNaN(bitsfromleft)){
        cform.result.value = '无效';
        return;
    }
    sumofbits+=bitsfromleft;
    //
    tmpvar = parseInt(cform.snm_2.value,10);
    if (isNaN(tmpvar)){
        cform.result.value = '无效';
        return;
    }
    bitsfromleft=h_countbitsfromleft(tmpvar);
    if (isNaN(bitsfromleft)){
        cform.result.value = '无效';
        return;
    }
    sumofbits+=bitsfromleft;
    //
    tmpvar = parseInt(cform.snm_3.value,10);
    if (isNaN(tmpvar)){
        cform.result.value = '无效';
        return;
    }
    bitsfromleft=h_countbitsfromleft(tmpvar);
    if (isNaN(bitsfromleft)){
        cform.result.value = '无效';
        return;
    }
    sumofbits+=bitsfromleft;
    //
    tmpvar = parseInt(cform.snm_4.value,10);
    if (isNaN(tmpvar)){
        cform.result.value = '无效';
        return;
    }
    bitsfromleft=h_countbitsfromleft(tmpvar);
    if (isNaN(bitsfromleft)){
        cform.result.value = '无效';
        return;
    }
    sumofbits+=bitsfromleft;
    cform.result.value = sumofbits;
    return;
}

function resetform1(cform) {
    cform.result.value="";
    cform.snm_1.value=255;
    cform.snm_2.value=255;
    cform.snm_3.value=255;
    cform.snm_4.value=0;
}

//--------------------------

function h_fillbitsfromleft(num)
{
    if (num >= 8 ){
        return(255);
    }
    bitpat=0xff00; 
    while (num > 0){
        bitpat=bitpat >> 1;
        num--;
    }
    return(bitpat & 0xff);
}

function calcNWmask(cform)
{
    tmpvar = parseInt(cform.bits.value,10);
    if (isNaN(tmpvar) || tmpvar > 32 || tmpvar < 0){
        cform.snm_1.value = '错误';
        cform.snm_2.value="";
        cform.snm_3.value="";
        cform.snm_4.value="";
        return(1);
    }
    cform.snm_1.value=0;
    cform.snm_2.value=0;
    cform.snm_3.value=0;
    cform.snm_4.value=0;
    if (tmpvar >= 8){
        cform.snm_1.value = 255;
        tmpvar-=8;
    }else{
        cform.snm_1.value = h_fillbitsfromleft(tmpvar);
        return(0);
    }
    if (tmpvar >= 8){
        cform.snm_2.value = 255;
        tmpvar-=8;
    }else{
        cform.snm_2.value = h_fillbitsfromleft(tmpvar);
        return(0);
    }
    if (tmpvar >= 8){
        cform.snm_3.value = 255;
        tmpvar-=8;
    }else{
        cform.snm_3.value = h_fillbitsfromleft(tmpvar);
        return(0);
    }
    cform.snm_4.value = h_fillbitsfromleft(tmpvar);
    return(0);
}

function calcNWmaskForm2(cform)
{
    var rt=0;
    cform.hex_1.value="";
    cform.hex_2.value="";
    cform.hex_3.value="";
    cform.hex_4.value="";
    rt=calcNWmask(cform);
    if (rt !=0 ){
        // error
        return(1);
    }
    tmpvar=cform.snm_1.value;
    cform.hex_1.value = h_paddto2(h_from10toradix(tmpvar,16));
    tmpvar=cform.snm_2.value;
    cform.hex_2.value = h_paddto2(h_from10toradix(tmpvar,16));
    tmpvar=cform.snm_3.value;
    cform.hex_3.value = h_paddto2(h_from10toradix(tmpvar,16));
    tmpvar=cform.snm_4.value;
    cform.hex_4.value = h_paddto2(h_from10toradix(tmpvar,16));
}

function resetform2(cform) {
    cform.bits.value=24;
    cform.snm_1.value="";
    cform.snm_2.value="";
    cform.snm_3.value="";
    cform.snm_4.value="";
    cform.hex_1.value="";
    cform.hex_2.value="";
    cform.hex_3.value="";
    cform.hex_4.value="";
}

//--------------------------

function resetform3(cform) {
    cform.ip_1.value=10;
    cform.ip_2.value=0;
    cform.ip_3.value=0;
    cform.ip_4.value=255;
    cform.bits_1.value="";
    cform.bits_2.value="";
    cform.bits_3.value="";
    cform.bits_4.value="";
    cform.hex_1.value="";
    cform.hex_2.value="";
    cform.hex_3.value="";
    cform.hex_4.value="";
}

function calcBinBits(cform)
{
    cform.bits_1.value="";
    cform.bits_2.value="";
    cform.bits_3.value="";
    cform.bits_4.value="";
    //
    tmpvar = parseInt(cform.ip_1.value,10);
    if (isNaN(tmpvar) || tmpvar < 0 || tmpvar > 255){
        cform.bits_1.value = '错误';
        return;
    }
    cform.bits_1.value = h_paddto8(h_from10toradix(tmpvar,2));
    cform.hex_1.value = h_paddto2(h_from10toradix(tmpvar,16));
    //
    tmpvar = parseInt(cform.ip_2.value,10);
    if (isNaN(tmpvar) || tmpvar < 0 || tmpvar > 255){
        cform.bits_2.value = '错误';
        return;
    }
    cform.bits_2.value = h_paddto8(h_from10toradix(tmpvar,2));
    cform.hex_2.value = h_paddto2(h_from10toradix(tmpvar,16));
    //
    tmpvar = parseInt(cform.ip_3.value,10);
    if (isNaN(tmpvar)  || tmpvar < 0 || tmpvar > 255){
        cform.bits_3.value = '错误';
        return;
    }
    cform.bits_3.value = h_paddto8(h_from10toradix(tmpvar,2));
    cform.hex_3.value = h_paddto2(h_from10toradix(tmpvar,16));
    //
    tmpvar = parseInt(cform.ip_4.value,10);
    if (isNaN(tmpvar) || tmpvar < 0 || tmpvar > 255){
        cform.bits_4.value = '错误';
        return;
    }
    cform.bits_4.value = h_paddto8(h_from10toradix(tmpvar,2));
    cform.hex_4.value = h_paddto2(h_from10toradix(tmpvar,16));
}

//--------------------------

function reset_rest_from4(cform){
    cform.bcast_1.value ="";
    cform.bcast_2.value ="";
    cform.bcast_3.value ="";
    cform.bcast_4.value ="";
    //
    cform.nwadr_1.value ="";
    cform.nwadr_2.value ="";
    cform.nwadr_3.value ="";
    cform.nwadr_4.value ="";
    //
    cform.firstadr_1.value ="";
    cform.firstadr_2.value ="";
    cform.firstadr_3.value ="";
    cform.firstadr_4.value ="";
    //
    cform.lastadr_1.value ="";
    cform.lastadr_2.value ="";
    cform.lastadr_3.value ="";
    cform.lastadr_4.value ="";
    //
    cform.snm_1.value ="";
    cform.snm_2.value ="";
    cform.snm_3.value ="";
    cform.snm_4.value ="";
    //
    cform.numofaddr.value ="";
}

function resetform4(cform) {
    cform.bits.value=24;
    cform.ip_1.value=10;
    cform.ip_2.value=0;
    cform.ip_3.value=0;
    cform.ip_4.value=5;
    //
    reset_rest_from4(cform);
}

function calNBFL(cform) {
    var rt=0;
    reset_rest_from4(cform);
    tmpvar = parseInt(cform.ip_1.value,10);
    if (isNaN(tmpvar) || tmpvar > 255 || tmpvar < 0){
        cform.numofaddr.value = '错误';
        return(1);
    }
    tmpvar = parseInt(cform.ip_2.value,10);
    if (isNaN(tmpvar) || tmpvar > 255 || tmpvar < 0){
        cform.numofaddr.value = '错误';
        return(1);
    }
    tmpvar = parseInt(cform.ip_3.value,10);
    if (isNaN(tmpvar) || tmpvar > 255 || tmpvar < 0){
        cform.numofaddr.value = '错误';
        return(1);
    }
    tmpvar = parseInt(cform.ip_4.value,10);
    if (isNaN(tmpvar) || tmpvar > 255 || tmpvar < 0){
        cform.numofaddr.value = '错误';
        return(1);
    }
    rt=calcNWmask(cform);
    if (rt !=0 ){
        // error
        return(1);
    }
    tmpvar=parseInt(cform.bits.value,10);
    if (tmpvar <0){
        cform.numofaddr.value = '错误';
        return(1);
    }
    if (tmpvar >32){
        cform.numofaddr.value = '错误';
        return(1);
    }
    if (tmpvar == 31){
        cform.numofaddr.value = "two hosts";
        cform.firstadr_1.value = cform.ip_1.value & cform.snm_1.value;
        cform.firstadr_2.value = cform.ip_2.value & cform.snm_2.value;
        cform.firstadr_3.value = cform.ip_3.value & cform.snm_3.value;
        cform.firstadr_4.value = cform.ip_4.value & cform.snm_4.value;
        //
        cform.lastadr_1.value = cform.ip_1.value | (~ cform.snm_1.value & 0xff);
        cform.lastadr_2.value = cform.ip_2.value | (~ cform.snm_2.value & 0xff);
        cform.lastadr_3.value = cform.ip_3.value | (~ cform.snm_3.value & 0xff);
        cform.lastadr_4.value = cform.ip_4.value | (~ cform.snm_4.value & 0xff);
        return(1);
    }
    if (tmpvar == 32){
        cform.numofaddr.value = "one host";
        cform.firstadr_1.value = cform.ip_1.value;
        cform.firstadr_2.value = cform.ip_2.value;
        cform.firstadr_3.value = cform.ip_3.value;
        cform.firstadr_4.value = cform.ip_4.value;
        return(1);
    }
    cform.numofaddr.value = Math.pow(2,32 - tmpvar) - 2;
    //
    cform.bcast_1.value = cform.ip_1.value | (~ cform.snm_1.value & 0xff);
    cform.bcast_2.value = cform.ip_2.value | (~ cform.snm_2.value & 0xff);
    cform.bcast_3.value = cform.ip_3.value | (~ cform.snm_3.value & 0xff);
    cform.bcast_4.value = cform.ip_4.value | (~ cform.snm_4.value & 0xff);
    //
    cform.nwadr_1.value = cform.ip_1.value & cform.snm_1.value;
    cform.nwadr_2.value = cform.ip_2.value & cform.snm_2.value;
    cform.nwadr_3.value = cform.ip_3.value & cform.snm_3.value;
    cform.nwadr_4.value = cform.ip_4.value & cform.snm_4.value;
    //
    cform.firstadr_1.value = cform.nwadr_1.value;
    cform.firstadr_2.value = cform.nwadr_2.value;
    cform.firstadr_3.value = cform.nwadr_3.value;
    cform.firstadr_4.value = parseInt(cform.nwadr_4.value) + 1;
    //
    cform.lastadr_1.value = cform.bcast_1.value;
    cform.lastadr_2.value = cform.bcast_2.value;
    cform.lastadr_3.value = cform.bcast_3.value;
    cform.lastadr_4.value = parseInt(cform.bcast_4.value) - 1;
    return(0);
}

//--------------------------

function resetform6(cform) {
    cform.numofaddr.value=5;
    cform.bits.value="";
    cform.maxaddr.value="";
    cform.snm_1.value="";
    cform.snm_2.value="";
    cform.snm_3.value="";
    cform.snm_4.value="";
}

function calcNeeded(cform){
    tmpvar = parseInt(cform.numofaddr.value,10);
    if (isNaN(tmpvar) || tmpvar > 0xfffffffe || tmpvar < 1){
        cform.bits.value="ERR";
        cform.snm_1.value="";
        cform.snm_2.value="";
        cform.snm_3.value="";
        cform.snm_4.value="";
        cform.maxaddr.value="";
        return;
    }
    expval=parseInt(Math.log(tmpvar)/Math.log(2)) + 1;
    maxaddrval=Math.pow(2,expval);
    if (maxaddrval - tmpvar < 2){
        expval+=1;
    }
    cform.maxaddr.value= Math.pow(2,expval) - 2;
    cform.bits.value=32 - expval;
    calcNWmask(cform);
}
    
//--------------------------
function calcAmount(cform){
    tmpvar = parseInt(cform.bits.value,10);
    if (isNaN(tmpvar) || tmpvar > 30 || tmpvar < 0){
        cform.numofaddr.value = '错误';
        cform.maxaddr.value="";
        cform.snm_1.value="";
        cform.snm_2.value="";
        cform.snm_3.value="";
        cform.snm_4.value="";
        return;
    }
    cform.maxaddr.value=Math.pow(2,32 - tmpvar);
    cform.numofaddr.value=Math.pow(2,32 - tmpvar)- 2;
    calcNWmask(cform);
}

function resetform7(cform) {
    cform.numofaddr.value="";
    cform.maxaddr.value="";
    cform.bits.value=27;
    cform.snm_1.value="";
    cform.snm_2.value="";
    cform.snm_3.value="";
    cform.snm_4.value="";
}
//--------------------------
function resetform8(cform) {
    cform.ip_1.value=255;
    cform.ip_2.value=255;
    cform.ip_3.value=240;
    cform.ip_4.value=0;
    cform.invert_1.value="";
    cform.invert_2.value="";
    cform.invert_3.value="";
    cform.invert_4.value="";
}

function calcIpInvert(cform){
    cform.invert_1.value="";
    cform.invert_2.value="";
    cform.invert_3.value="";
    cform.invert_4.value="";
    //
    tmpvar = parseInt(cform.ip_1.value,10);
    if (isNaN(tmpvar) ){
        cform.invert_1.value = 'NaN';
        return;
    }
    cform.invert_1.value = 0xff & ~ tmpvar;
    //
    tmpvar = parseInt(cform.ip_2.value,10);
    if (isNaN(tmpvar) ){
        cform.invert_2.value = 'NaN';
        return;
    }
    cform.invert_2.value = 0xff & ~ tmpvar;
    //
    tmpvar = parseInt(cform.ip_3.value,10);
    if (isNaN(tmpvar) ){
        cform.invert_3.value = 'NaN';
        return;
    }
    cform.invert_3.value = 0xff & ~ tmpvar;
    //
    tmpvar = parseInt(cform.ip_4.value,10);
    if (isNaN(tmpvar) ){
        cform.invert_4.value = 'NaN';
        return;
    }
    cform.invert_4.value = 0xff & ~ tmpvar;
}
//--------------------------
function resetform9(cform) {
    cform.dec_1.value="";
    cform.bin_1.value="";
    cform.num.value="";
}

function convertnum_hex(cform){
    cform.dec_1.value="";
    cform.bin_1.value="";
    //
    tmpvar=cform.num.value.replace(/0x/i,"");
    cform.num.value=tmpvar;
    tmpvar = parseInt(cform.num.value,16);
    if (isNaN(tmpvar) ){
        cform.dec_1.value = 'NaN';
        cform.bin_1.value = 'NaN';
        return;
    }
    cform.dec_1.value = tmpvar;
    cform.bin_1.value = h_from10toradix(tmpvar,2);
}
//--------------------------
function resetform10(cform) {
    cform.dec_1.value="";
    cform.hex_1.value="";
    cform.num.value="";
}

function convertnum_bin(cform){
    cform.dec_1.value="";
    cform.hex_1.value="";
    //
    tmpvar = parseInt(cform.num.value,2);
    if (isNaN(tmpvar) ){
        cform.dec_1.value = 'NaN';
        cform.hex_1.value = 'NaN';
        return;
    }
    cform.dec_1.value = tmpvar;
    cform.hex_1.value = h_from10toradix(tmpvar,16);
}
//--------------------------
function resetform11(cform) {
    cform.bin_1.value="";
    cform.hex_1.value="";
    cform.num.value="";
}

function convertnum_dec(cform){
    cform.bin_1.value="";
    cform.hex_1.value="";
    //
    tmpvar = parseInt(cform.num.value,10);
    if (isNaN(tmpvar) ){
        cform.bin_1.value = 'NaN';
        cform.hex_1.value = 'NaN';
        return;
    }
    cform.hex_1.value = h_from10toradix(tmpvar,16);
    cform.bin_1.value = h_from10toradix(tmpvar,2);
}
//--------------------------
function resetform12(cform) {
    cform.hex.value="";
    cform.ip_1.value="";
    cform.ip_2.value="";
    cform.ip_3.value="";
    cform.ip_4.value="";
    cform.bits_1.value="";
    cform.bits_2.value="";
    cform.bits_3.value="";
    cform.bits_4.value="";
}

function dot2hex(cform){
    cform.ip_1.value="";
    cform.ip_2.value="";
    cform.ip_3.value="";
    cform.ip_4.value="";
    cform.bits_1.value="";
    cform.bits_2.value="";
    cform.bits_3.value="";
    cform.bits_4.value="";
    tmpvar=cform.hex.value.replace(/0x/i,"");
    cform.hex.value=tmpvar.substr(0,8);
    //
    tmpvar = parseInt(tmpvar,16);
    if (isNaN(tmpvar)){
        cform.ip_1.value = '错误';
        return;
    }
    cform.hex.value = h_paddto8(cform.hex.value);
    cform.ip_1.value = parseInt(cform.hex.value.substr(0,2),16);
    cform.bits_1.value=h_paddto8(h_from10toradix(cform.ip_1.value,2));
    cform.ip_2.value = parseInt(cform.hex.value.substr(2,2),16);
    cform.bits_2.value=h_paddto8(h_from10toradix(cform.ip_2.value,2));
    cform.ip_3.value = parseInt(cform.hex.value.substr(4,2),16);
    cform.bits_3.value=h_paddto8(h_from10toradix(cform.ip_3.value,2));
    cform.ip_4.value = parseInt(cform.hex.value.substr(6,2),16);
    cform.bits_4.value=h_paddto8(h_from10toradix(cform.ip_4.value,2));
}
//--------------------------

// end hiding contents from old browsers  -->