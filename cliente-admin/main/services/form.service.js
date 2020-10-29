app
.service("sForm",function()
{
    this.formData = (model) => 
    {
        var formData = new FormData();
        angular.forEach(model,(value,key)=>{
            formData.append(key,value);
        });
        return formData;
    };
});