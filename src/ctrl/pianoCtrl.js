app.controller("pianoCtrl", function($scope,$http,$location) {
    
    // student Constructor
    function student(fname, lname, level, phone, finance) {
        this.fname = fname;
        this.lname = lname;
        this.level = level;
        this.phone = phone;
        this.finance = finance;
        
    };
   // $scope.students = localStorage["bookTable"];
    $scope.fname = localStorage["bookTable"];
    

})



