enums
=======

enum creator

```javascript
var enums = require("@nathanfaucett/enums");


var Numbers = enums(["ONE", "TWO"]);


Numbers.ONE === Numbers.ONE;
Numbers.ONE !== Numbers.TWO;
```
