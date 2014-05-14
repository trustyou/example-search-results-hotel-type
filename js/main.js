(function($, Mustache) {
	"use strict";

	/*
	This is the list of hotels that this example is based on. It is
	hardcoded here; in all real-life applications, these IDs and names
	would be a result of a query.

	The picked hotels represent the best hotels in Berlin, categorized by type.

	While we have used a custom ranking function for selecting the hotels,
	it is of course possible to build such a function yourself solely based on
	the data we provide.
	*/

	// we need to preserve order for processing in a later step, hence the array
	var hotels = [
		{"all": [
			{
				name: "Hotel Adlon Kempinski",
				tyId: "60fd56b6-8f61-4672-a1d3-d76ec6bcf540",
				image: "img/Hotel_Adlon_Kempinski.jpg"
			},
			{
				name: "The Mandala Hotel",
				tyId: "a6d7ac66-51ca-46b4-9a74-57324a2977b4",
				image: "img/The_Mandala_Hotel.jpg"
			},
			{
				name: "Das Stue",
				tyId: "359e1e4b-569a-4f97-aaa1-357f241a851b",
				image: "img/Das_Stue.jpg"
			},
			{
				name: "Adina Apartment Hotel Berlin Hackescher Markt",
				tyId: "387d25e2-4321-4b45-a02a-e548a460383a",
				image: "img/Adina_Apartment_Hotel_Berlin_Hackescher_Markt.jpg"
			},
			{
				name: "Regent Berlin",
				tyId: "07a403a9-cb62-4a20-a134-139b2eab7fdb",
				image: "img/Regent_Berlin.jpg"
			},
		]},
		{"business": [
			{
				name: "Motel One Berlin Hauptbahnhof",
				tyId: "c1f0a26b-0709-4bfa-b7fa-ef56327e1469",
				image: "img/Motel_One_Berlin_Hauptbahnhof.jpg"
			},
			{
				name: "Scandic Hotel Berlin Potsdamer Platz",
				tyId: "38476f88-fd4c-476f-a0f0-b84ebd63f72b",
				image: "img/Scandic_Hotel_Berlin_Potsdamer_Platz.jpg"
			},
			{
				name: "Seminaris Campus Hotel",
				tyId: "6fa82f2a-8d41-411e-b512-9978c0d52ad2",
				image: "img/Seminaris_Campus_Hotel.jpg"
			},
			{
				name: "Casa Camper Berlin",
				tyId: "83d3c9ee-1709-497d-a1e3-a83243e9aae4",
				image: "img/Casa_Camper_Berlin.jpg"
			},
			{
				name: "Regent Berlin",
				tyId: "07a403a9-cb62-4a20-a134-139b2eab7fdb",
				image: "img/Regent_Berlin.jpg"
			},
		]},
		{"family": [
			{
				name: "Mitte Inn Berlin",
				tyId: "84efccf5-c165-4e66-a554-bdb0e08c808d",
				image: "img/Mitte_Inn_Berlin.jpg"
			},
			{
				name: "Akzent Hotel am Forum Steglitz",
				tyId: "1c9f79c1-3f1f-4f94-9efb-a132dccb0d4d",
				image: "img/Akzent_Hotel_am_Forum_Steglitz.jpg"
			},
			{
				name: "Louisa's Place",
				tyId: "51fa5415-45d4-4bff-a104-e2098931ccdd",
				image: "img/Louisas_Place.jpg"
			},
			{
				name: "Citylight Hotel",
				tyId: "a0cded15-9aaa-49bc-855d-52ffbc169105",
				image: "img/Citylight_Hotel.jpg"
			},
			{
				name: "Suite Novotel Ber Potsdamer Pl",
				tyId: "b631adf6-92e3-437d-99e4-f96dce092b31",
				image: "img/Suite_Novotel_Ber_Potsdamer_Pl.jpg"
			}
		]},
		{"romantic": [
			{
				name: "Casa Camper Berlin",
				tyId: "83d3c9ee-1709-497d-a1e3-a83243e9aae4",
				image: "img/Casa_Camper_Berlin.jpg"
			},
			{
				name: "Michelberger Hotel",
				tyId: "68717314-3769-4e9a-84aa-1915c42d5889",
				image: "img/Michelberger_Hotel.jpg"
			},
			{
				name: "The Circus Hotel",
				tyId: "383ad18c-b1a0-4076-92e6-7f432c0fa8fa",
				image: "img/The_Circus_Hotel.jpg"
			},
			{
				name: "Regent Berlin",
				tyId: "07a403a9-cb62-4a20-a134-139b2eab7fdb",
				image: "img/Regent_Berlin.jpg"
			},
			{
				name: "Adina Apartment Hotel Berlin Checkpoint Charlie",
				tyId: "72ed40a4-1680-42be-b94c-626c13de1ea7",
				image: "img/Adina_Apartment_Hotel_Berlin_Checkpoint_Charlie.jpg"
			},
		]},
		{"luxury": [
			{
				name: "Hotel Adlon Kempinski",
				tyId: "60fd56b6-8f61-4672-a1d3-d76ec6bcf540",
				image: "img/Hotel_Adlon_Kempinski.jpg"
			},
			{
				name: "Hotel de Rome",
				tyId: "652088f5-fcfa-4e46-b44f-85200355acfa",
				image: "img/Hotel_de_Rome.jpg"
			},
			{
				name: "Radisson BLU Hotel",
				tyId: "4d3137f4-cdec-4050-9026-fcfe453e30a7",
				image: "img/Radisson_BLU_Hotel.jpg"
			},
			{
				name: "The Mandala Hotel",
				tyId: "a6d7ac66-51ca-46b4-9a74-57324a2977b4",
				image: "img/The_Mandala_Hotel.jpg"
			},
			{
				name: "H10 Berlin Ku'damm",
				tyId: "9651726f-855f-4420-8b3a-3de1e0ccea48",
				image: "img/H10_Berlin_Kudamm.jpg"
			}
		]},
	];

	/*
	Prepare the request to the TrustYou API. We will make use of the Bulk
	API to launch several requests at once. Note how the language and
	version need to be passed with each individual request, but the
	mandatory API key need only be put once in the bulk request.
	*/
	var requestList = [];
	hotels.forEach(function(catHotels) {
		for (var cat in catHotels) break;
		var catRequestList = catHotels[cat].map(function(hotel) {
			/*
			When querying a JSON widget, always ask for the specific
			version you developed against. This guarantees that no schema-
			breaking changes will affect your code.
			*/
			return "/hotels/" + hotel.tyId + "/tops_flops.json?" + $.param({lang: "en", v: "5.16"});
		});
		requestList.push.apply(requestList, catRequestList);
	});
	// JSON-encode the request list
	requestList = JSON.stringify(requestList);

	var bulkRequest = $.ajax({
		url: "http://api.trustyou.com/bulk",
		data: {
			request_list: requestList,
			/*
			This is a demo API key, do not reuse it! Contact
			TrustYou to receive your own.
			*/
			key: "a06294d3-4d58-45c8-97a1-5c905922e03a"
		},
		// Usage of JSONP is not required for server-side calls
		dataType: "jsonp"
	}).fail(function() {
		throw "Bulk request failed!";
	});

	// when the DOM is ready for rendering, process the API response
	$(function() {
		bulkRequest.done(processApiResponse);

		// if a new filter is selected, activate it and deactivate others

		$('.tile > a').on('click', function(event) {
			if(!$(this).parent().hasClass('selected')) {
				$('.tile').removeClass('selected');
				$(this).parent().addClass('selected');
			}
		});
	});

	/**
	Render a result list hotel.

	@param hotelData - Data for this hotel from your database, e.g. its name
	@param reviewSummary - TrustYou Review Summary API response
	*/
	function renderHotel(hotelData, reviewSummary, hotelType) {
		// load the HTML template
		var hotelTemplate = $("#tmpl-hotel").html();
		// prepare the data to be passed to the template
		var templateData = {
			name: hotelData.name,
			image: hotelData.image,
			reviewsCount: reviewSummary["reviews_count"],
			trustScore: reviewSummary["summary"].score,
			scoreDescription: reviewSummary["summary"].score_description,
			highlights: []
		};

		/*
		When displaying several hotels on a result list page, it is
		usually a bit boring to show the most frequent categories with
		each hotel. People will always talk about location, service and
		room a lot, and it is repetitive to see "great location"
		several times.

		Instead, we will make use of hotel type specific categories as well as
		the "relevance" property, which is provided by TrustYou to find
		categories which set a hotel apart from other comparable hotels.

		Additionally, instead of a generic category name like "Great
		Location", we will use content from the "highlight_list"
		property. Highlights are quotes from actual customer reviews,
		which are much more unique and specific to the hotel, e.g.
		"Right next to Brandenburg Gate".
		*/

		var highlights = [];
		var hotelTypeCategories = [];
		// first, we add hotel type specific highlights and categories
		reviewSummary["hotel_type_list"].forEach(
			function(hotelTypeInfo) {
				if (hotelTypeInfo.category_name.toLowerCase().indexOf(hotelType) >= 0) {
					/*
					Every identified hotel type for a particular hotel has
					adequate categories attached. We make use of them here
					by adding all those with highlights to a list.
					*/
					hotelTypeInfo.sub_category_list.forEach(
						function(subCategory) {
							if (subCategory.highlight_list.length > 0) {
								hotelTypeCategories.push(subCategory);
							}
					});

					if (hotelTypeInfo.highlight_list.length > 0) {
						// add highlights related to hotel type
						hotelTypeInfo.highlight_list.forEach(function(highlight) {
							highlights.push(highlight.text);
						});
						/*
						Notice that we don't make use of the short text
						property here. This is because we have so many other
						sources for getting valuable highlights which are 
						preferred to the short text properties which can become
						repetitive for our use case.
						*/
					} 
				}
		});

		// we only want to show 3 highlights in total - of course you can show more
		var categories = [];
		if (highlights.length + hotelTypeCategories.length < 3) {
			/*
			If the hotel type highlights and hotel type subcategory highlights
			together are less than 3, we will fill the remaining spots with
			highlights from our general category list of that hotel, sorted
			by relevance.
			*/

			// Aggregate all categories into one list! Start with top-level categories ...
			categories = reviewSummary.category_list;
			// ... add all of their sub categories ...
			reviewSummary["category_list"].forEach(function(category) {
				categories = categories.concat(category["sub_category_list"]);
			});
			// ... and all good to know categories
			categories = categories.concat(reviewSummary["good_to_know_list"]);
		}

		// Finally sort our combined category list by relevance while giving
		// preference to the hotelTypeCategories
		var relevantCategories = hotelTypeCategories.concat(
			categories.sort(function(catA, catB) {
				return catB["relevance"] - catA["relevance"];
			})
		);

		// from each category, add one highlight
		var highlight;
		relevantCategories.forEach(function(category) {
			if (category["highlight_list"].length > 0) {
				/*
				If there are highlights for this category, pick
				the first one.
				*/
				highlight = category["highlight_list"][0]["text"];
				/*
				   Note that highlights can repeat in different
				   categories, so we have to check if the text is present
				   already before adding.
				   */
				if (highlights.indexOf(highlight) === -1) {
					highlights.push(highlight);
				}
			}
		});
		// take the top three highlights
		templateData.highlights = highlights.slice(0, 3).map(
			function(highlight) {
				return {
					text: highlight
				};
		});

		// render the template, and display the hotel
		var hotelRendered = Mustache.render(hotelTemplate, templateData);
		$("#search-results-" + hotelType).append(hotelRendered);
	}

	function getRelevantCategories(reviewSummary) {
		return categories;
	}

	/**
	Process a response from the TrustYou Bulk API.
	*/
	function processApiResponse(data) {
		// check whether the bulk request was successful
		if (data.meta.code !== 200) {
			throw "Bulk request failed!";
		}
		// go through all responses, and render each hotel
		var responses = data.response.response_list;
		responses.forEach(function(response, index) {
			// check whether the individual request was successful
			if (response.meta.code !== 200) {
				throw "Request failed!";
			}
			/*
			Results are guaranteed to be in the same order as the
			request_list we passed earlier, so we can merge the
			response with our data by their index
			*/
			var hotelType = "all";
			if (index >= 5) {
				if (index < 10) hotelType = "business";
				else if (index < 15) hotelType = "family";
				else if (index < 20) hotelType = "romantic";
				else hotelType = "luxury";
			}
			var hotelData = hotels[(index / 5) | 0][hotelType][index % 5];
			var reviewSummary = response.response;
			renderHotel(hotelData, reviewSummary, hotelType);
		});
	}

})($, Mustache);
