(function($, Mustache) {
	"use strict";

	/*
	This is the list of hotels that this example is based on. It is
	hardcoded here; in all real-life applications, these IDs and names
	would be a result of a query.

	The picked hotels represent the best hotels in Berlin, categorized by type.

	We have a sophisticated algorithm in place which ranks hotels per city.
	The outcome of the ranking is reflected in the "popularity" score of each
	entry of the "hotel_type_list" object. Hence, with our data it is really
	easy to grab that ranking information and present a ranking for hotel types
	per city on a web page.
	*/

	// we need to preserve order for processing in a later step, hence the array
	var hotels = [
		// 5 high ranking hotels in Berlin per hotel type based on our ranking.
		// "all" simply means ranked by TrustScore
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
				name: "Hilton Berlin Hotel",
				tyId: "a2b0b03e-3006-4fe9-a898-708a353a477d",
				image: "img/Hilton_Berlin_Hotel.jpg"
			},
			{
				name: "Adina Apartment Hotel Berlin Checkpoint Charlie",
				tyId: "72ed40a4-1680-42be-b94c-626c13de1ea7",
				image: "img/Adina_Apartment_Hotel_Berlin.jpg"
			},
			{
				name: "Hotel Berlin",
				tyId: "0d5e3ad8-a2b7-42eb-b2d7-52281eadbf4a",
				image: "img/Hotel_Berlin.jpg"
			},
			{
				name: "Swissotel Berlin",
				tyId: "f220cddb-4602-4d29-b29d-bcb69a24285d",
				image: "img/Swissotel_Berlin.jpg"
			},
			{
				name: "InterContinental Berlin",
				tyId: "4bed91db-3376-45ea-bcf2-45fc8ff89547",
				image: "img/InterContinental_Berlin.jpg"
			},
		]},
		{"family": [
			{
				name: "Adina Apartment Hotel Berlin Checkpoint Charlie",
				tyId: "72ed40a4-1680-42be-b94c-626c13de1ea7",
				image: "img/Adina_Apartment_Hotel_Berlin.jpg"
			},
			{
				name: "Novotel Berlin Mitte",
				tyId: "39b707ea-9d26-46d6-91e3-f1e12eb95aa7",
				image: "img/Novotel_Berlin_Mitte.jpg"
			},
			{
				name: "Suite Novotel Berlin Potsdamer Platz",
				tyId: "b631adf6-92e3-437d-99e4-f96dce092b31",
				image: "img/Suite_Novotel_Berlin_Potsdamer_Platz.jpg"
			},
			{
				name: "Louisa's Place",
				tyId: "51fa5415-45d4-4bff-a104-e2098931ccdd",
				image: "img/Louisa's_Place.jpg"
			},
			{
				name: "Victor's Residenz Hotel Berlin",
				tyId: "0efdb987-7eb7-4b08-b6e3-0a521bc2bfec",
				image: "img/Victor's_Residenz_Hotel_Berlin.jpg"
			}
		]},
		{"romantic": [
			{
				name: "Hilton Berlin Hotel",
				tyId: "a2b0b03e-3006-4fe9-a898-708a353a477d",
				image: "img/Hilton_Berlin_Hotel.jpg"
			},
			{
				name: "Radisson BLU Hotel",
				tyId: "4d3137f4-cdec-4050-9026-fcfe453e30a7",
				image: "img/Radisson_BLU_Hotel.jpg"
			},
			{
				name: "Regent Berlin",
				tyId: "07a403a9-cb62-4a20-a134-139b2eab7fdb",
				image: "img/Regent_Berlin.jpg"
			},
			{
				name: "Hotel Adlon Kempinski",
				tyId: "60fd56b6-8f61-4672-a1d3-d76ec6bcf540",
				image: "img/Hotel_Adlon_Kempinski.jpg"
			},
			{
				name: "Pullman Berlin Schweizerhof",
				tyId: "ae6db065-86a4-4d27-9d59-fcfe9e14c9c7",
				image: "img/Pullman_Berlin_Schweizerhof.jpg"
			},
		]},
		{"luxury": [
			{
				name: "Regent Berlin",
				tyId: "07a403a9-cb62-4a20-a134-139b2eab7fdb",
				image: "img/Regent_Berlin.jpg"
			},
			{
				name: "Hotel de Rome",
				tyId: "652088f5-fcfa-4e46-b44f-85200355acfa",
				image: "img/Hotel_de_Rome.jpg"
			},
			{
				name: "Hotel Adlon Kempinski",
				tyId: "60fd56b6-8f61-4672-a1d3-d76ec6bcf540",
				image: "img/Hotel_Adlon_Kempinski.jpg"
			},
			{
				name: "Hilton Berlin Hotel",
				tyId: "a2b0b03e-3006-4fe9-a898-708a353a477d",
				image: "img/Hilton_Berlin_Hotel.jpg"
			},
			{
				name: "Grand Hyatt Berlin",
				tyId: "05620b88-073f-4d1e-abb5-1577133f8a99",
				image: "img/Grand_Hyatt_Berlin.jpg"
			},
		]},
	];

	// mapping to the hotel type keys
	// use those as they won't change in the future
	var htypeMapping = {
		business: "16h",
		family: "16c",
		romantic: "16d",
		luxury: "16b"
	};

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
			return "/hotels/" + hotel.tyId + "/tops_flops.json?" + $.param({lang: "en"});
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
			This is a demo API key, do not reuse it!
			Contact TrustYou to receive your own.
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
	@param hotelType - The hotel type of the specific hotel we are looking at
	*/
	function renderHotel(hotelData, reviewSummary, hotelType) {
		// load the HTML template
		var hotelTemplate = $("#tmpl-hotel").html();
		// prepare the data to be passed to the template
		var popularity;
		if (hotelType === "all") {
			popularity = [];
		} else {
			// the hotel can have more hotel types assigned to it
			for (var i = 0; i < reviewSummary.hotel_type_list.length; i++) {
				var hotelTypeInfo = reviewSummary.hotel_type_list[i];
				if (hotelTypeInfo.category_id === htypeMapping[hotelType]) {
					popularity = [(hotelTypeInfo.popularity).toFixed()];
					break;
				}
			}
		}
		var templateData = {
			name: hotelData.name,
			image: hotelData.image,
			reviewsCount: reviewSummary.reviews_count,
			trustScore: reviewSummary.summary.score,
			scoreDescription: reviewSummary.summary.score_description,
			popularity: popularity,
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
		reviewSummary.hotel_type_list.forEach(
			function(hotelTypeInfo) {
				if (hotelTypeInfo.category_id === htypeMapping[hotelType]) {
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
						repetitive in our use case.
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
			reviewSummary.category_list.forEach(function(category) {
				categories = categories.concat(category.sub_category_list);
			});
			// ... and all good to know categories
			categories = categories.concat(reviewSummary.good_to_know_list);
		}

		// Finally sort our combined category list by relevance while giving
		// preference to the hotelTypeCategories
		var relevantCategories = hotelTypeCategories.concat(
			categories.sort(function(catA, catB) {
				return catB.relevance - catA.relevance;
			})
		);

		// from each category, add one highlight
		var highlight;
		relevantCategories.forEach(function(category) {
			if (category.highlight_list.length > 0) {
				/*
				If there are highlights for this category, pick
				the first one.
				*/
				highlight = category.highlight_list[0].text;
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

	function getHotelType(index) {
		var hotelType = "all";
		if (index >= 5) {
			if (index < 10) hotelType = "business";
			else if (index < 15) hotelType = "family";
			else if (index < 20) hotelType = "romantic";
			else hotelType = "luxury";
		}
		return hotelType;
	}

	function getPopularity(slice, hotelType) {
		for (var i = 0; i < slice[1].response.hotel_type_list.length; i++) {
			var hotelTypeInfo = slice[1].response.hotel_type_list[i];
			if (hotelTypeInfo.category_id === htypeMapping[hotelType]) {
				return hotelTypeInfo.popularity;
			}
		}
		// if we can't find the expected hotel type, we have a problem!
		throw "HotelType " + hotelType + " not found for hotel: " + slice[1];
	}

	/**
	Process a response from the TrustYou Bulk API.
	*/
	function processApiResponse(data) {
		// check whether the bulk request was successful
		if (data.meta.code !== 200) {
			throw "Bulk request failed!";
		}
		// now go through all responses, and render each hotel in the correct order
		var responses = data.response.response_list;
		var responsesSorted = [];
		var chunk = hotels[0].all.length;
		var currentSlices = [];
		/*
		Results are guaranteed to be in the same order as the
		request_list we passed earlier. Therefore, we can merge the
		response with our data by their index.
		*/
		responses.forEach(function(response, index) {
			// check whether the individual request was successful
			if (response.meta.code !== 200) {
				throw "Request failed!";
			}
			/*
			We need to sort the hotels by popularity (of hotel type) as they
			might not be in the correct order and the rank of a hotel can
			change over time, e.g. due to new reviews.
			*/
			currentSlices.push([index, response]);
			// once we have seen all hotels of a hotel type category
			if ((index + 1) % 5 === 0) {
				var hotelType = getHotelType(index);
				var currentSlicesFiltered = currentSlices;
				if (hotelType !== "all") {
					// filter out hotels which don't have the expected hotel type
					currentSlicesFiltered = [];
					for (var i = 0; i < currentSlices.length; i++) {
						try {
							getPopularity(currentSlices[i], hotelType);
							currentSlicesFiltered.push(currentSlices[i]);
						} catch(e) {
							if (e.indexOf("HotelType ") === 0) {
								// do nothing here as we simply won't add this
								// element to the new array
							}
							else {
								throw e;
							}
						}
					}
				}
				currentSlicesFiltered.sort(function(a, b) {
					if (hotelType === "all") {
						// highest score should be moved to first spot in array
						return -(a[1].response.summary.score - b[1].response.summary.score);
					} else {
						var aPopularity = getPopularity(a, hotelType);
						var bPopularity = getPopularity(b, hotelType);
						// lowest probability should be moved to first spot in array
						return aPopularity - bPopularity;
					}
				});
				currentSlicesFiltered.forEach(function(slice) {
					var hotelIndex = slice[0];
					var hotelResponse = slice[1];
					var hotelData = hotels[(hotelIndex / 5) | 0][hotelType][hotelIndex % 5];
					var reviewSummary = hotelResponse.response;
					renderHotel(hotelData, reviewSummary, hotelType);
				});
				currentSlices = [];
			}
		});
	}

})($, Mustache);
