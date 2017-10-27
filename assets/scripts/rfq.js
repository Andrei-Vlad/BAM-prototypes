$(document).ready(function(){
    $("input.dependent").click(function(){
        if( $(this).attr("checked") == true ){
            $("input[name=assy]").attr("checked",true);
        }
        });
    $("input[name=assy]").click(function(){
        if( $(this).attr("checked") == false ){
            $("input.dependent").attr("checked",false);
        }
        });
    $("input:submit").click(function(){
        try{
            ga('send', 'event', 'RFQ', 'submit');
        }
        catch(err){
            console.log('ga error');
        }
    });

});
