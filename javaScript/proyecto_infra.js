function h_initArray()
{
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

// return netmaks in bits format or -1 on error
function calcNWbits(maskip)
{
    var sumofbits=0;
    var bitsfromleft;
    bitsfromleft=h_countbitsfromleft(maskip[0]);
    if (isNaN(bitsfromleft)){
        return(-1);
    }
    sumofbits+=bitsfromleft;
    //
    bitsfromleft=h_countbitsfromleft(maskip[1]);
    if (isNaN(bitsfromleft)){
        return(-1);
    }
    sumofbits+=bitsfromleft;
    //
    bitsfromleft=h_countbitsfromleft(maskip[2]);
    if (isNaN(bitsfromleft)){
        return(-1);
    }
    sumofbits+=bitsfromleft;
    //
    bitsfromleft=h_countbitsfromleft(maskip[3]);
    if (isNaN(bitsfromleft)){
        return(-1);
    }
    sumofbits+=bitsfromleft;
    return(sumofbits);
}

function calcNWbits_formfill(cform)
{
    var maskip=[];
    var tmpvar=0;
    tmpvar = parseInt(cform.snm_1.value,10);
    if (isNaN(tmpvar)){
        cform.result.value = 'invalid';
        return;
    }
    maskip[0]=tmpvar;
    tmpvar = parseInt(cform.snm_2.value,10);
    if (isNaN(tmpvar)){
        cform.result.value = 'invalid';
        return;
    }
    maskip[1]=tmpvar;
    tmpvar = parseInt(cform.snm_3.value,10);
    if (isNaN(tmpvar)){
        cform.result.value = 'invalid';
        return;
    }
    maskip[2]=tmpvar;
    tmpvar = parseInt(cform.snm_4.value,10);
    if (isNaN(tmpvar)){
        cform.result.value = 'invalid';
        return;
    }
    maskip[3]=tmpvar;
    tmpvar=calcNWbits(maskip);
    if(tmpvar<0){
        cform.result.value = 'invalid';
        return;
    }
    cform.result.value =tmpvar;
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

function fillhexNWmask(cform)
{
    var tmpvar;
    tmpvar=cform.snm_1.value;
    cform.hex_1.value = h_paddto2(h_from10toradix(tmpvar,16));
    tmpvar=cform.snm_2.value;
    cform.hex_2.value = h_paddto2(h_from10toradix(tmpvar,16));
    tmpvar=cform.snm_3.value;
    cform.hex_3.value = h_paddto2(h_from10toradix(tmpvar,16));
    tmpvar=cform.snm_4.value;
    cform.hex_4.value = h_paddto2(h_from10toradix(tmpvar,16));
}

function calcNWmask(cform,netbits)
{
    if (isNaN(netbits) || netbits > 32 || netbits < 0){
        cform.snm_1.value = 'ERR';
        cform.snm_2.value="";
        cform.snm_3.value="";
        cform.snm_4.value="";
        return(1);
    }
    cform.bits.value=netbits;
    cform.snm_1.value=0;
    cform.snm_2.value=0;
    cform.snm_3.value=0;
    cform.snm_4.value=0;
    if (netbits >= 8){
        cform.snm_1.value = 255;
        netbits-=8;
    }else{
        cform.snm_1.value = h_fillbitsfromleft(netbits);
        return(0);
    }
    if (netbits >= 8){
        cform.snm_2.value = 255;
        netbits-=8;
    }else{
        cform.snm_2.value = h_fillbitsfromleft(netbits);
        return(0);
    }
    if (netbits >= 8){
        cform.snm_3.value = 255;
        netbits-=8;
    }else{
        cform.snm_3.value = h_fillbitsfromleft(netbits);
        return(0);
    }
    cform.snm_4.value = h_fillbitsfromleft(netbits);
    return(0);
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
        cform.bits_1.value = 'ERR';
        return;
    }
    cform.bits_1.value = h_paddto8(h_from10toradix(tmpvar,2));
    cform.hex_1.value = h_paddto2(h_from10toradix(tmpvar,16));
    //
    tmpvar = parseInt(cform.ip_2.value,10);
    if (isNaN(tmpvar) || tmpvar < 0 || tmpvar > 255){
        cform.bits_2.value = 'ERR';
        return;
    }
    cform.bits_2.value = h_paddto8(h_from10toradix(tmpvar,2));
    cform.hex_2.value = h_paddto2(h_from10toradix(tmpvar,16));
    //
    tmpvar = parseInt(cform.ip_3.value,10);
    if (isNaN(tmpvar)  || tmpvar < 0 || tmpvar > 255){
        cform.bits_3.value = 'ERR';
        return;
    }
    cform.bits_3.value = h_paddto8(h_from10toradix(tmpvar,2));
    cform.hex_3.value = h_paddto2(h_from10toradix(tmpvar,16));
    //
    tmpvar = parseInt(cform.ip_4.value,10);
    if (isNaN(tmpvar) || tmpvar < 0 || tmpvar > 255){
        cform.bits_4.value = 'ERR';
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
    cform.bits.value ="";
    cform.snm_1.value ="";
    cform.snm_2.value ="";
    cform.snm_3.value ="";
    cform.snm_4.value ="";
    //
    cform.numofaddr.value ="";
    //
    cform.hex_1.value="";
    cform.hex_2.value="";
    cform.hex_3.value="";
    cform.hex_4.value="";
    cform.errortxt.value="";
}

function resetform4(cform) {
    cform.ip.value="10.0.0.5/24";
    //
    reset_rest_from4(cform);
}

// main form at the top of the page:
function calNBFL(cform) {
    var rt=0;
    reset_rest_from4(cform);
    var ip=[];
    var inputstr,firstip,netbits,netbits_str;
    inputstr=cform.ip.value.replace(/[^0-9\.\/ ]/g," ");
    inputstr=inputstr.replace(/[ \t]+/g," "); // one space only
    inputstr=inputstr.replace(/^\D+/,""); // no non digit at the beginning
    inputstr=inputstr.replace(/\D+$/,""); // no non digit at end
    cform.ip.value=inputstr; // display back to the user
    //
    ipaddr_usr_input=inputstr.match(/\d+\.\d+\.\d+\.\d+/g);
    if (ipaddr_usr_input==null || ipaddr_usr_input.length < 1){
        cform.errortxt.value = 'ERROR: no valid IPv4 addr';
        return(1);
    }
    ip=ipaddr_usr_input[0].match(/\d+/g); // extract all the ip digits without the dot
    var i=0;
    while (i < 3)//a revisar prro por que deveria ser <= y no < ya que solo abarca los primeros 3 y no valida el ultimo haciendo que llegue hasta mas de 9k
    {
        if (isNaN(ip[i]) || ip[i] > 255 || ip[i] < 0){
            cform.errortxt.value = 'ERROR: no valid ip addr digits';
            return(1);
        }
        i++;
    }
    netbits_str=inputstr.match(/\/\d+/);
    if (netbits_str && netbits_str.length==1){
        // mask was given as /bits
        netbits=parseInt(netbits_str[0].replace(/\//,""),10);
    }else{
        // maybe the mask was given in ip format, e.g: 255.255.255.0
        if (ipaddr_usr_input.length == 2){
            var maskip=ipaddr_usr_input[1].match(/\d+/g); // extract all the mask digits without the dot
            var i=0;
            while (i < 3){
                if (isNaN(maskip[i]) || maskip[i] > 255 || maskip[i] < 0){
                    cform.errortxt.value = 'ERROR: no valid mask digits';
                    return(1);
                }
                i++;
            }
            netbits=calcNWbits(maskip);
        }else{
            cform.errortxt.value = 'ERROR: no valid mask' + ipaddr_usr_input.length;
            return(1);
        }
    }
    if (netbits >32 || netbits<0){
        cform.errortxt.value = 'ERROR: mask bits out of range';
        return(1);
    }
    rt=calcNWmask(cform,netbits);
    if (rt !=0 ){
        // error
        return(1);
    }
    cform.bits.value="/"+netbits; // we need a slash therefore rewrite what calcNWmask already wrote
    fillhexNWmask(cform);
    if (netbits == 31){
        cform.numofaddr.value = "two hosts";
        cform.firstadr_1.value = ip[0] & cform.snm_1.value;
        cform.firstadr_2.value = ip[1] & cform.snm_2.value;
        cform.firstadr_3.value = ip[2] & cform.snm_3.value;
        cform.firstadr_4.value = ip[3] & cform.snm_4.value;
    }}