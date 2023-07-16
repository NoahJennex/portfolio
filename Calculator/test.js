"use strict";

function main()
{
    var x = "Hello";
    var y = x.slice(0, x.length - 1);
    console.log(y);
}


if (require.main === module)
{
    main();
}