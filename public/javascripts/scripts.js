module.exports = {
  getStudentGender : function(studentGender){
    var gender;
    if(studentGender === 'M'){
      gender = 'Male';
    } else {
      gender = 'Female';
    }
    return gender;
  },
  dateValidateGetAge : function(date) {
    date = new Date(date);
    var today = new Date();
    var years = today.getFullYear() - date.getFullYear();
    date.setFullYear(today.getFullYear());
    if (today < date) {  
      years--;  
    }  
  
    if (years < 18) {
      return false;
    } else {
      return true;
    }
  }
}