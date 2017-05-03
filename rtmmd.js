var converter = new showdown.Converter({tables: true, smoothLivePreview: true});

function markdown(el) {
	// save the original comment text
	$(el).attr('data-rtmmd-text', el.innerHTML);
	// upon editing the comment, restore the original text
	$(el).parents('.b-Do-bu').find('.b-Do-i-l:contains(Edit)').click(function(ael) {
		el.innerHTML = $(el).attr('data-rtmmd-text');
		$(el).find('a').contents().unwrap();
	});
	// convert markdown into html, replacing linebreaks with newlines
	el.innerHTML = converter.makeHtml(el.innerHTML.replace(/<br>/g, '\n'));
	// mark the comments as processed, to apply css
	$(el).addClass('rtmmd');
}

// as comments appear in the dom, markdown their content
insertionQ('.b-Fo .b-f-n-er .b-f-n').every(function(element){
	markdown(element);
});

// when clicking on "Save" or "Cancel" on an open comment, re-markdown the contents
$(document).on('click', '.b-f-n-er button', function() { 
	markdown($(this).parents('.b-f-n-er').find('.b-f-n').get(0)); 
});

// todo: need to parse out <a> when saving the innerHTML
