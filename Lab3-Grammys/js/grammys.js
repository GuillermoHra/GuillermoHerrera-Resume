$.ajax({
    url: "data/grammys.json",
    type: "GET",
    dataType: "json",
    success: function (data) {
        let new_html = '';
        for(let i=0; i<data.fields.length; i++) {
            new_html += ` <option value="${data.fields[i].field_id}">${data.fields[i].field}</option> `;
        }
        $("#category_types").append(new_html);
        $("#category_types").on('change', function(){
            $("#nominees_section").empty();
            let new_html1 = '';
            for(let i=0; i<data.fields.length; i++) {
                if(this.value == i+1) {
                    new_html1 += ` <h1>${data.fields[i].field}</h1>
                                <h4>${data.fields[i].description}</h4> 
                                <h2>Categories</h2> `;
                    for(let j=0; j<data.fields[i].categories.length; j++) {
                        new_html1 += ` <h3>${data.fields[i].categories[j].category_name}</h3> 
                                <h4>${data.fields[i].categories[j].description}</h4> <br><br>`;
                        let winner = data.fields[i].categories[j].winner_id;
                        for(let k=0; k<data.fields[i].categories[j].nominees.length; k++) {
                            new_html1 += ` <h4 class="list_item">${data.fields[i].categories[j].nominees[k].nominee}</h4> `;
                            if(k == winner) {
                                new_html1 += ` <h4 class="winner">     WINNER!</h4> `;
                            }
                            new_html1 += ` <h5>${data.fields[i].categories[j].nominees[k].artist}</h5>
                                    <h5>${data.fields[i].categories[j].nominees[k].info}</h5> `;
                        }
                    } 
                }
            }
            $("#nominees_section").append(new_html1);
        });
    },
    error: function (error_msg) {
        console.log(error_msg);
    }
});
