function getMeasurement(){
    var i = 0;
    var t = 0;
    var arrayDownloadSPD = [];
    var arrayUploadSPD = [];
    var arrayLatency = [];
    $('#mainButton').removeClass('primary');
    $('#mainButton').html('<img class="gifloading" src="images/loading.gif" />');
    $('#mainButton').removeAttr('href');
    var interval = setInterval(function(){
        var dSpeed = Math.floor(Math.random() * (100 - 90) ) + 90;
        var lNumber = Math.floor(Math.random() * (210 - 150) ) + 150;
        var uSpeed = Math.floor(Math.random() * (50 - 40) ) + 40;
        arrayDownloadSPD.push(dSpeed);
        arrayUploadSPD.push(uSpeed);
        arrayLatency.push(lNumber);
        $('.downNum').find('.num').html(dSpeed);
        $('.latNum').find('.num').html(lNumber);
        $('.upNum').find('.num').html(uSpeed);
        document.getElementById('speedometer').classList = 'wrapper arc'+(dSpeed-90);
        if(i == 19){
            clearInterval(interval);
            document.getElementById('speedometer').classList = 'wrapper arc0';
            $('.downNum').find('.num').html(Math.round(_.mean(arrayDownloadSPD)));
            $('.latNum').find('.num').html(Math.round(_.mean(arrayLatency)));
            $('.upNum').find('.num').html(Math.round(_.mean(arrayUploadSPD)));
            $('#mainButton').addClass('primary');
            $('#mainButton').html('Medir');
            $('#mainButton').attr('href','javascript:getMeasurement();');
            recordVariables(Math.round(_.mean(arrayDownloadSPD)), Math.round(_.mean(arrayLatency)), Math.round(_.mean(arrayUploadSPD)), new Date());
        }
        i++;
    },500);
    var intervalDec = setInterval(function(){
        if(t > 10){
            var randomNum1 = ''+Math.floor(Math.random() * (99 - 0) );
            var randomNum2 = ''+Math.floor(Math.random() * (99 - 0) );
            var randomNum3 = ''+Math.floor(Math.random() * (99 - 0) );
            randomNum1 = randomNum1.length >= 2 ? '.'+randomNum1 : '.0'+randomNum1;
            randomNum2 = randomNum2.length >= 2 ? '.'+randomNum2 : '.0'+randomNum2;
            randomNum3 = randomNum3.length >= 2 ? '.'+randomNum3 : '.0'+randomNum3;
            if(t == 199){
                var randomNum1 = '.00';
                var randomNum2 = '.00';
                var randomNum3 = '.00';
                clearInterval(intervalDec);
            }
            $('.downNum').find('.decimal').html(randomNum1);
            $('.latNum').find('.decimal').html(randomNum2);
            $('.upNum').find('.decimal').html(randomNum3);
        }
        t++;
    },50);
}

function recordVariables(down, lat, up, date){
    var arrayDown = localStorage.download ? localStorage.download.split(',') : [];
    var arrayLat = localStorage.latency ? localStorage.latency.split(',') : [];
    var arrayUp = localStorage.upload ? localStorage.upload.split(',') : [];
    var arrayDate = localStorage.date ? localStorage.date.split(',') : [];
    arrayDown.splice(0,0,down+' mbps');
    arrayLat.splice(0,0,lat+' ms');
    arrayUp.splice(0,0,up+' mbps');
    arrayDate.splice(0,0,date.toLocaleString());
    localStorage.download = arrayDown.join(',');
    localStorage.latency = arrayLat.join(',');
    localStorage.upload = arrayUp.join(',');
    localStorage.date = arrayDate.join(',');
    populateHistory();
}

function populateHistory(){
    $('.history').html('<div class="row title"><div>Data</div><div>Latência</div><div>Download</div><div>Upload</div></div>');
    if(localStorage.download){
        var arrayDown = localStorage.download.split(',');
        var arrayLat = localStorage.latency.split(',');
        var arrayUp = localStorage.upload.split(',');
        var arrayDate = localStorage.date.split(',');
        for(var i = 0; i < arrayDown.length; i++){
            $('.history').append('<div class="row"><div>'+arrayDate[i]+'</div><div>'+arrayLat[i]+'</div><div>'+arrayDown[i]+'</div><div>'+arrayUp[i]+'</div></div>');
        }
    } else {
        $('.history').append('<div class="row full"><div>Nenhum registro no histórico.</div></div>');
    }
}

function updateName(){
    var name = $('#input-edit').val() ? $('#input-edit').val() : localStorage.name;
    if(!name){
        name = 'Anônimo';
    } else {
        localStorage.name = name;
    }
    $('#name-span').html(name);
    $('#input-edit').val(name);
}