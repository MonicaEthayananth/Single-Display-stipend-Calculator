var StipendAlloc = {
//bit mask value calculation
    fallAug: 20,
    fallSep: 22,
    fallOct: 24,
    fallNov: 26,
    fallDec: 28,
    springJan: 9,
    springFeb: 11,
    springMar: 13,
    springApr: 15,
	springMay: 17,

	

	form: {}
};
//initilising the input & output parameters
StipendAlloc.init = function() {

	this.form['stiamt'] = $('#input\\.StipendAmount');
	this.form['sem'] = $('#input\\.SemesterTerm');
	this.form['year'] = $('#input\\.SemesterYear');
	this.form['month'] = $('#input\\.MonthsinYear');
	this.form['total'] = $('#output\\.TotalAmount');
	this.form['submit'] = $('#btn\\.submit');
	this.form['reset'] = $('#btn\\.reset');

	//Submit button action listener
	this.form.submit.on('click', function(e) {
		return StipendAlloc.calculate();
	});

	//reset button action listener
	this.form.reset.on('click', function(e) {
		$('#form')[0].reset();
	});

	//update monthly total value allocated
	this.form.total.on('update', function(e, amt) {
		amount = parseFloat(amt).toFixed(2);
		$(this).val(amount);
	});
	

};


StipendAlloc.calculate = function() {
	//input stiped amount is taken as float value with two decimals points
	var stiamt = this.form.stiamt.length ? parseFloat(this.form.stiamt.val()).toFixed(2) : 0.00;
	var sem = parseInt(this.form.sem.val());
	var year = parseInt(this.form.year.val());
	var month = parseInt(this.form.month.val());
	var total = 0;
	//initializing constant values for fall2017
	var fall = 75;
	var Augday = 6;
	var Sepday = 21;
	var Octday = 22;
	var Novday = 22;
	var Decday = 4;
	//initializing constant values for spring2107
	var spring = 79;
	var Janday = 12;
	var Febday = 20;
	var Marday = 22;
	var Aprday = 21;
	var Mayday = 4;
	//calculating the bitmask value 
	var bitmask = sem + year + month;
	//monthly stipend calculation for fall2017
    
	if((this.fallAug & bitmask) === this.fallAug) {
	total = (stiamt*(Augday/fall));
	}
	if((this.fallSep & bitmask) === this.fallSep) {
	total = (stiamt*(Sepday/fall));
	}
	if((this.fallOct & bitmask) === this.fallOct) {
	total = (stiamt*(Octday/fall));
	}
	if((this.fallNov & bitmask) === this.fallNov) {
	total = (stiamt*(Novday/fall));
	}
	if((this.fallDec & bitmask) === this.fallDec) {
	total = (stiamt*(Decday/fall));
	}
	//monthly stipend calcultion for spring2017
	if((this.springJan & bitmask) === this.springJan) {
	total = (stiamt*(Janday/spring));
	}
	if((this.springFeb & bitmask) === this.springFeb) {
	total = (stiamt*(Febday/spring));
	}
	if((this.springMar & bitmask) === this.springMar) {
	total = (stiamt*(Marday/spring));
	}
	if((this.springApr & bitmask) === this.springApr) {
	total = (stiamt*(Aprday/spring));
    }
	if((this.springMay & bitmask) === this.springMay) {
	total = (stiamt*(Mayday/spring));
	}
	

//calculating the final value

	this.form.total.trigger('update', [total]);
	
};

//init on page load
StipendAlloc.init();
