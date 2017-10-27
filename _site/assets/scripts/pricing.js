call="call ";

$(document).ready( function(){
    $(":text").keyup( auto_update.increase );
    $(":checkbox, :radio").click( auto_update.increase );
    } );

//waits a number of seconds
auto_update = {
    delay : 1000, 
    _count : 0,
    increase : function(){
        auto_update._count++;
        setTimeout( auto_update.decrease, auto_update.delay );
        },
    decrease : function(){
        auto_update._count--;
        if( auto_update._count == 0 )
            process_input();
        },
}

function text_to_int( text ){
    var t= parseInt( text );
    if( isNaN( t ) ) t = 0;
    return t;
}

function process_input(){
    var data={};
    data.pcbs = text_to_int( $("#pcbs").val() );
    data.pcbx = $("#pcbx").val();
    data.pcby = $("#pcby").val();
    data.smt_lines = text_to_int( $("#smt_lines").val() );
    data.smts = text_to_int( $("#smts").val() );
    data.ths = text_to_int( $("#ths").val() );
    data.currency = $("input[name='currency']:checked").val();
    data.stencil = $("input[name='stencil']:checked").val();
    data.units = $("input[name='units']:checked").val();
    if( $("#sides").is(":checked") )
        data.sides = 2;
    else
        data.sides = 1;
    quote = $.getJSON( 'scripts/pricing.py', data, update_display );
}


function update_display( data ){
    try{
        ga('send','event','Pricing','Update');
    }
    catch(err){
        console.log('caught error'+err);
    }
    for( var c=0; c<data.length; c++ ){
        var i = c+1;
        var col = '.col'+i;
        data[c].price = Math.round( data[c].price );
        $('th.leadtime'+col).text( data[c].leadtime + ' day' );
        $('td.price'+col).text( data[c].price );
        $('td.stencil'+col).text( data[c].stencil );
        $('td.shipping'+col).text( data[c].shipping );
        $('td.total'+col).text( data[c].stencil + data[c].shipping +
            data[c].price );
    }
    if( c < 3)
        for( c ; c<3; c++ ){
            i = c+1;
            col = '.col'+i;
            $('th'+col).html('&nbsp&nbsp&nbsp&nbsp');
            $('td'+col).text('');
        }
}

