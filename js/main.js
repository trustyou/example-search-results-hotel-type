(function($, Mustache) {
	"use strict";

	/*
	This is the list of hotels that this example is based on. It is
	hardcoded here, while in all real-life applications these IDs and names
	would be the result of a query.

	Actually, the correct way to get the data for this live example would be to
	crawl all hotels from Berlin. We can't do that here as it would take
	too long. Hence, we're demonstrating the functionality with selected
	top hotels of each hotel type category.

	We have a sophisticated algorithm in place which ranks hotels per city.
	The outcome of the ranking is reflected in the "popularity" score of each
	entry of the "hotel_type_list" object. Hence, with our data it is really
	easy to grab that ranking information and present a ranking for hotel types
	per city on a web page.
	*/
	var hotels = [
		{tyId: "60fd56b6-8f61-4672-a1d3-d76ec6bcf540", name: "Hotel Adlon Kempinski", image: "img/Hotel_Adlon_Kempinski.jpg"},
		{tyId: "359e1e4b-569a-4f97-aaa1-357f241a851b", name: "Das Stue", image: "img/Das_Stue.jpg"},
		{tyId: "387d25e2-4321-4b45-a02a-e548a460383a", name: "Adina Apartment Hotel Berlin Hackescher Markt", image: "img/Adina_Apartment_Hotel_Berlin_Hackescher_Markt.jpg"},
		{tyId: "07a403a9-cb62-4a20-a134-139b2eab7fdb", name: "Regent Berlin", image: "img/Regent_Berlin.jpg"},
		{tyId: "a2b0b03e-3006-4fe9-a898-708a353a477d", name: "Hilton Berlin Hotel", image: "img/Hilton_Berlin_Hotel.jpg"},
		{tyId: "72ed40a4-1680-42be-b94c-626c13de1ea7", name: "Adina Apartment Hotel Berlin Checkpoint Charlie", image: "img/Adina_Apartment_Hotel_Berlin.jpg"},
		{tyId: "0d5e3ad8-a2b7-42eb-b2d7-52281eadbf4a", name: "Hotel Berlin", image: "img/Hotel_Berlin.jpg"},
		{tyId: "f220cddb-4602-4d29-b29d-bcb69a24285d", name: "Swissotel Berlin", image: "img/Swissotel_Berlin.jpg"},
		{tyId: "39b707ea-9d26-46d6-91e3-f1e12eb95aa7", name: "Novotel Berlin Mitte", image: "img/Novotel_Berlin_Mitte.jpg"},
		{tyId: "b631adf6-92e3-437d-99e4-f96dce092b31", name: "Suite Novotel Berlin Potsdamer Platz", image: "img/Suite_Novotel_Berlin_Potsdamer_Platz.jpg"},
		{tyId: "51fa5415-45d4-4bff-a104-e2098931ccdd", name: "Louisa's Place", image: "img/Louisa's_Place.jpg"},
		{tyId: "4d3137f4-cdec-4050-9026-fcfe453e30a7", name: "Radisson BLU Hotel", image: "img/Radisson_BLU_Hotel.jpg"},
		{tyId: "ae6db065-86a4-4d27-9d59-fcfe9e14c9c7", name: "Pullman Berlin Schweizerhof", image: "img/Pullman_Berlin_Schweizerhof.jpg"},
		{tyId: "05620b88-073f-4d1e-abb5-1577133f8a99", name: "Grand Hyatt Berlin", image: "img/Grand_Hyatt_Berlin.jpg"},
		{tyId: "83d3c9ee-1709-497d-a1e3-a83243e9aae4", name: 'Casa Camper Berlin', image: 'img/Casa_Camper_Berlin.jpg'},
		{tyId: "383ad18c-b1a0-4076-92e6-7f432c0fa8fa", name: 'Hotel The Circus', image: 'img/Hotel_The_Circus.jpg'},
		{tyId: "72da9727-e00a-405f-a70f-51f32e4429a2", name: 'Hotel Mondial', image: 'img/Hotel_Mondial.jpg'},
		{tyId: "f20807ae-9917-4eb8-8038-42093398d2fa", name: "Lindner Hotel Am Ku'damm Berlin", image: "img/Lindner_Hotel_Am_Kudamm_Berlin.jpg"},
		{tyId: "5815190d-b5a8-403f-add0-abc0b85bc00a", name: 'Aldea Novum', image: 'img/Aldea_Novum.jpg' },
		{tyId: "b8921518-8795-4fbf-a5cd-93502f9b087c", name: 'wombats CITY HOSTEL Berlin', image: 'img/wombats_CITY_HOSTEL_Berlin.jpg'},
		{tyId: "b213ee57-da12-4203-82c4-23c5d5b834f3", name: 'SORAT Hotel Ambassador', image: 'img/SORAT_Hotel_Ambassador.jpg'},
		{tyId: "56333f62-a3a8-4664-90b3-b1108103980b", name: 'Plus Berlin', image: 'img/Plus_Berlin.jpg'},
		{tyId: "2b2b53a1-4579-4b43-a85d-82d076f8495d", name: 'H2 Hotel Berlin-Alexanderplatz', image: 'img/H2_Hotel_Berlin-Alexanderplatz.jpg'},
		{tyId: "7c9618cb-012c-4c3c-a0f1-e9a9eb2c1341", name: 'Waldorf Astoria Berlin', image: 'img/Waldorf_Astoria_Berlin.jpg'},
		{tyId: "103df85f-9ddf-4bbd-8203-bc9da4f5bec2", name: 'Ela Apartments Berlin', image: 'img/Ela_Apartments_Berlin.jpg'},
		{tyId: "1a2c0327-6830-430d-bde9-5b446dbb2734", name: 'Meliá Hotel Berlin', image: 'img/Melia_Hotel_Berlin.jpg'},
		{tyId: "ce76ba37-2a1b-4524-b8fd-230514f92f47", name: 'ARCOTEL John F', image: 'img/ARCOTEL_John_F.jpg'},
		{tyId: "68717314-3769-4e9a-84aa-1915c42d5889", name: 'Michelberger Hotel', image: 'img/Michelberger_Hotel.jpg'},
		{tyId: "bbe1c134-c657-4f69-ad17-032316eb7be4", name: 'The Weinmeister Berlin-Mitte', image: 'img/The_Weinmeister_Berlin-Mitte.jpg'},
		{tyId: "7663ef79-2116-4528-8a76-be2531890322", name: 'Jpg Apartment Schoneberg', image: 'img/Jpg_Apartment_Schoneberg.jpg'},
		{tyId: "76fc91d1-f56f-4b87-b7ac-99a9008b4ec4", name: 'Nhow Berlin', image: 'img/Nhow_Berlin.jpg'},
		{tyId: "6537e123-3f94-4433-ba57-d5af88e944dd", name: 'SANA Berlin Hotel', image: 'img/SANA_Berlin_Hotel.jpg'},
		{tyId: "f51229a9-3ad7-4a43-acb4-00b1fc879835", name: 'Hotel Indigo Berlin Alexanderplatz', image: 'img/Hotel_Indigo_Berlin_Alexanderplatz.jpg'},
		{tyId: "eed0de04-42b4-4aae-b47c-1c912a7e9e4d", name: 'Mercure Airport Berlin Tegel', image: 'img/Mercure_Airport_Berlin_Tegel.jpg'},
		{tyId: "c22300ca-f2af-4fde-a7e8-795950277bc4", name: 'Hotel Artim Charlottenburg', image: 'img/Hotel_Artim_Charlottenburg.jpg'}
	];

	// mapping of hotel type keys
	// use those as they won't change in the future
	var hTypes = {
		"all": "all",
		"16h": "business",
		"16c": "family",
		"16d": "romantic",
		"16b": "luxury",
		"16i": "party",
		"16k": "budget",
		"16e": "wellness",
		"16f": "city-trip",
		"16g": "boutique",
		"16r": "club",
		"16t": "beach",
		"16w": "design",
		"16aa": "airport",
	};

	/*
	Prepare the request to the TrustYou API. We will make use of the Bulk
	API to launch several requests at once. Note how the language and
	version need to be passed with each individual request, but the
	mandatory API key need only be put once in the bulk request.
	*/
	var requestList = [];
	hotels.forEach(function(hotel) {
		// You could also specify the version as a parameter to make sure that
		// future updates of our api won't break your code. In this case, however,
		// we always want to work the newest version.
		requestList.push("/hotels/" + hotel.tyId + "/tops_flops.json?" + $.param({lang: "en"}));
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
	});

	/**
	Render a result list hotel.

	@param hotelData - Data for this hotel from your database, e.g. its name
	@param reviewSummary - TrustYou Review Summary API response
	@param hTypeKey - The hotel type of the specific hotel we are looking at
	@param rank - Rank of hotel for a specific hotel type
	*/
	function renderHotel(hotelData, reviewSummary, hTypeKey, rank) {
		// load the HTML template
		var hotelTemplate = $("#tmpl-hotel").html();
		// get actual name of hotel type
		var hTypeName = "Hotel";
		for (var i = 0; i < reviewSummary.hotel_type_list.length; i++) {
			var hotelTypeInfo = reviewSummary.hotel_type_list[i];
			if (hotelTypeInfo.category_id === hTypeKey) {
				hTypeName = hotelTypeInfo.category_name;
				break;
			}
		}
		// prepare the data to be passed to the template
		var templateData = {
			name: hotelData.name,
			image: hotelData.image,
			reviewsCount: reviewSummary.reviews_count,
			trustScore: reviewSummary.summary.score,
			scoreDescription: reviewSummary.summary.score_description,
			rank: rank,
			highlights: [],
			hotelTypeName: hTypeName
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
				if (hotelTypeInfo.category_id === hTypeKey) {
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

		// we only want to show 3 highlights in total (of course you can show more)
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
		$("#search-results-" + hTypes[hTypeKey]).append(hotelRendered);
	}

	function sortResponses(responses, hTypeKey) {
		responses.sort(function(a, b) {
			if (hTypeKey === "all") {
				// highest score should be moved to first spot in array
				return -(a.response.summary.score - b.response.summary.score);
			} else {
				var aPopularity = getPopularity(a, hTypeKey);
				var bPopularity = getPopularity(b, hTypeKey);
				// lowest popularity should be moved to first spot in array
				return aPopularity - bPopularity;
			}
		});
	}

	function getPopularity(data, hTypeKey) {
		for (var i = 0; i < data.response.hotel_type_list.length; i++) {
			var hotelTypeInfo = data.response.hotel_type_list[i];
			if (hotelTypeInfo.category_id === hTypeKey) {
				return hotelTypeInfo.popularity;
			}
		}
		return "not found";
	}

	/**
	Process a response from the TrustYou Bulk API.
	*/
	function processApiResponse(data) {
		// check whether the bulk request was successful
		if (data.meta.code !== 200) {
			throw "Bulk request failed!";
		}
		var responses = data.response.response_list;
		responses.forEach(function(response, index) {
			// check whether the individual request was successful
			if (response.meta.code !== 200) {
				throw "Request failed!";
			}
			/*
			Results are guaranteed to be in the same order as the
			request_list we passed earlier. Therefore, we can merge the
			response with our data by their index and add some context.
			*/
			response.hotel_data = hotels[index];
		});

		// now go through all hotel types and render a maximum of five hotels
		// in the correct order
		for (var hTypeKey in hTypes) {
			var filteredResponses = [];
			if (hTypeKey === "all") {
				filteredResponses = responses;
			} else {
				for (var j = 0; j < responses.length; j++) {
					if (getPopularity(responses[j], hTypeKey) !== "not found") {
						filteredResponses.push(responses[j]);
					}
				}
			}
			sortResponses(filteredResponses, hTypeKey);
			for (var i = 0; i < Math.min(filteredResponses.length, 5); i++) {
				var hotelResponse = filteredResponses[i];
				var hotelData = hotelResponse.hotel_data;
				var reviewSummary = hotelResponse.response;
				var rank = i + 1;
				renderHotel(hotelData, reviewSummary, hTypeKey, rank);
			}
		}
	}
})($, Mustache);
