//---------------------------------------------------------------------------------------------
Array.prototype.sortNumbers = function()
{
    return this.sort(
        function(a,b){
            return a - b
        }
    );
}
//---------------------------------------------------------------------------------------------
Array.prototype.sortText = function(ascdes = 'asc')
{
    if(ascdes = 'asc')
    {
        return this.sort(
            function(a,b){
                return a.localeCompare(b);
            }
        );
    }
    else
    {
        return this.sort(
            function(a,b){
                return b.localeCompare(a);
            }
        );
    }
}
//---------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------
/////////////////////////////// AJAX //////////////////////////////////////////////////////////
//---------------------------------------------------------------------------------------------
function httpGet(http, url, callBackGet)
{
    http({
        method : "GET",  // GET, JSONP
        url : url
    }).then(function mySuccess(response) {
        callBackGet(response.data);
    }, function myError(response) {
        callBackGet(response.statusText);
    });
}
//---------------------------------------------------------------------------------------------
function httpPost(http, url, data, callBackGet)
{
    http({
        method : "POST",
        url : url,
        headers: {'Content-type': 'application/json; charset=UTF-8'}, // {'Content-Type': undefined},
        data: data
    }).then(function mySuccess(response) {
        callBackGet(response.data);
    }, function myError(response) {
        callBackGet(response.statusText);
    });
}
//---------------------------------------------------------------------------------------------
/////////////////////////////// GridJS ////////////////////////////////////////////////////////
//---------------------------------------------------------------------------------------------
function createGrid(id, data, pagLimit = 0, search = false, sort = false, customColumns = '')
{
    // customColumns = [   { id: 'name',       name: 'Name' },
    //                     { id: 'email',      name: 'Email' },
    //                     { id: 'phoneNumber',name: 'Phone Number' }  ];

    let columns = customColumns='' ? Object.keys(data[0]) : customColumns;
    new gridjs.Grid({
        columns: columns,
        data: data,
        pagination: pagLimit>0 ? {limit: pagLimit} : false,
        search: search, // true,
        // resizable: true,
        sort: sort, //true,
        width: '100%',
        autoWidth: true,
        language: {
            'search': {
                'placeholder': '🔎 Search'
            },
            'pagination': {
                'previous': '⏮',
                'next': '⏭',
                'showing': 'Displaying',
                // 'showing': '👀 Displaying',
                'results': () => 'Records'
            }
          }
      }).render(document.getElementById(id));
}
//---------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------

