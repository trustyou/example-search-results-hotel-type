(function($, Mustache, i18n, lang) {
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
	{tyId: "c22300ca-f2af-4fde-a7e8-795950277bc4", name: 'Hotel Artim Charlottenburg', image: 'img/Hotel_Artim_Charlottenburg.jpg'},
	{tyId: "da00834e-2ad4-40b2-a64d-5c2bd61d5d6a", name: 'Berlin Marriott Hotel', image: 'img/mariott_berlin.jpg'},
	{tyId: "652088f5-fcfa-4e46-b44f-85200355acfa", name: 'Hotel de Rome', image: 'img/hotel-de-rome.jpg'},
	{tyId: "ae9e8b4f-5f8f-4b19-8369-b0c8ae713418", name: 'Cozy Off Kudamm Apartments', image: 'img/cozy_off_kudam.jpg'},
	{tyId: "da0d1b2c-5122-4538-9027-b198bb653f14", name: 'Titanic Deluxe Berlin', image: 'img/Mercure_Airport_Berlin_Tegel.jpg'},
	{tyId: "1bf5e707-db84-48b7-8571-7ab5431340d0", name: 'Ibis Berlin Kurfuerstendamm', image: 'img/ibis_kudam.jpg'},
	{tyId: "978fd953-1b8f-43a2-9eb2-a92e1545bb9a", name: 'Q-Damm-Apartments', image: 'img/qdamm_apartments.jpg'},
	{tyId: "5785b7de-5de2-4013-8051-c9ca3d536d72", name: 'TopDomizil Panorama Apartments Friedrichstraße', image: 'img/topdomizil_panorama.jpg'},
	{tyId: "5ca46e2a-0750-41a1-b449-d388a25e8936", name: '25hours Hotel Bikini Berlin', image: 'img/25hours-hotel-bikini.jpg'},
	{tyId: "5b76178c-f9ba-4b6d-8a45-b13111840200", name: 'Riverside Am Tegel See', image: 'img/riverside_tegel.jpg'},
	{tyId: "954f7c26-2843-430e-8b6a-3eb778edb11f", name: 'Mittendrin', image: 'img/mittendrin_berlin.jpg'},
	{tyId: "dbf694c1-74ea-43a3-8ba3-d15e61a134dd", name: 'Residenz Villa Kult', image: 'img/residenz_villa_kult.jpg'},
	{tyId: "178c2815-16d5-428d-8eab-b443ab676681", name: 'Hotel Otto', image: 'img/hotel-otto.jpg'},
	{tyId: "fb75ad7b-77aa-4d9c-bda3-fb41c05b16fe", name: 'Hollywood Media Hotel', image: 'img/hollywood_media_hotel.jpg'},
	{tyId: "b35dddb5-18cc-469e-9ab4-d6e9bd9d7c29", name: 'Check In', image: 'img/check_in_hostel.jpg'},
	{tyId: "9e4244b3-81ad-426a-b7ee-6cec170c71a9", name: 'ABACUS Tierpark Hotel', image: 'img/abacus-tierpark-hotel.jpg'},
	{tyId: "0a2d4738-ea83-46ea-96a1-598b6fa1471f", name: 'Winters Hotel Berlin Mitte-The Wall at Checkpoint Charlie', image: 'img/winters_berlin_mitte.jpg'},
	{tyId: "f59cf46b-bb80-4b0c-b49d-3862211002bc", name: 'Jetpak Alternative', image: 'img/jetpak_alternative.jpg'},
	{tyId: "861cb204-f7a9-42b1-ae3a-42652b8ecdab", name: 'Hotel am Steinplatz - Autograph Collection', image: 'img/hotel_am_steinplatz.jpg'},
	{tyId: "1bda9c97-ce40-45de-9f36-ead7f02aca5c", name: 'SOHO HOUSE BERLIN', image: 'img/soho_house.jpg'},
	{tyId: "9f3f4a1a-982b-4db2-aae8-a43abe786ecf", name: 'Centrovital Berlin', image: 'img/centrovital-hotel-berlin.jpg'},
	{tyId: "4bed91db-3376-45ea-bcf2-45fc8ff89547", name: 'InterContinental Berlin', image: 'img/intercontinental-berlin.jpg'},
	{tyId: "89cad8af-4ca7-457a-be03-e2721f60d24e", name: 'Jugendhotel berlincity', image: 'img/jugendhotel-berlincity.jpg'},
	{tyId: "a6d7ac66-51ca-46b4-9a74-57324a2977b4", name: 'The Mandala Hotel', image: 'img/the_mandala.jpg'},
	{tyId: "1a20e70a-40ff-4f83-ad1d-10916f5352c9", name: 'Mercure Hotel & Residenz Berlin Checkpoint Charlie', image: 'img/mercure_checkpoint.jpg'},
	{tyId: "981b03ad-fb29-447f-8f11-f140abc5810c", name: 'Ackselhaus', image: 'img/ackselhaus.jpg'},
	{tyId: "83380df6-b102-4305-a890-20c2dadea9f7", name: 'Hotel Pension Columbus', image: 'img/hotel-pension-columbus.jpg'},
	{tyId: "d24611fe-19f0-4236-bf74-3147536f636c", name: 'Spree Idyll Hotel am Yachthafen', image: 'img/hotel-spree-idyll.jpg'},
	];

	// render container div with selected language
	var containerTemplate = $("#tmpl-container").html();
	$("body").html(Mustache.render(containerTemplate, {i18n: i18n[lang]}));

	/*
	Prepare the request to the TrustYou API. We will make use of the Bulk
	API to launch several requests at once. Note how the language and
	version need to be passed with each individual request, but the
	mandatory API key need only be put once in the bulk request.
	*/
	var requestList = [];
	hotels.forEach(function(hotel) {
		// We specify the version as a parameter to make sure that
		// future updates of our api won't break the code.
		requestList.push("/hotels/" + hotel.tyId + "/meta_review.json?" + $.param({lang: lang, v: "5.25", show_filters: false}));
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

		// when a tab change occurs
		$(document).on('shown.bs.tab', 'a[data-toggle="tab"]',function (e) {
			// if tab is activated from the "Show similar hotels"link
			if ($(this).hasClass('show-similar-hotels')){
				// remove active class from all tiles/dropdown menus
				$('#summary-filters a[data-toggle="tab"]').parent('li').removeClass('active');
				// activate newly selected tab
				$('#summary-filters a[href="' + $(this).attr('href') + '"]').parents('li, .tile').addClass('active');
			}

		});
	});

	/**
	Render a result list hotel.

	@param hotelData - Data for this hotel from your database, e.g. its name
	@param reviewSummary - TrustYou Review Summary API response
	@param categoryId - ID of the category list this hotel is to be rendered in
	@param rank - Rank of the hotel in this category
	@param showAll - Boolean to mark whether this render is for the "Best Mix" filter
	*/
	function renderHotel(hotelData, reviewSummary, categoryId, rank, showAll) {
		// load the HTML template
		var hotelTemplate = $("#tmpl-hotel").html();
		// prepare the data to be passed to the template
		var templateData = {
			name: hotelData.name,
			hotelId: hotelData.tyId,
			image: hotelData.image,
			reviewsCount: reviewSummary.reviews_count,
			trustScore: reviewSummary.summary.score,
			scoreDescription: reviewSummary.summary.score_description,
			rank: rank,
			highlights: [],
			categoryId: categoryId,
			categoryName: "",
			summarySentence: "",
			showAll: showAll,
			lang: lang,
			i18n: i18n[lang],
			additionalBadges: []
		};

		/*
		Build a nice summary sentence for this hotel.

		Rather than taking the pre-built sentence in the "text" property,
		we're going to build one to fit our needs. We'll show whatever is
		available in the "location_nearby", "location" and "summary_sentence_list"
		properties.
		*/
		var summarySentence = [reviewSummary.summary.location_nearby, reviewSummary.summary.location].concat(reviewSummary.summary.summary_sentence_list)
		.filter(function(component) {
			// filter out a component in case there's no data for it
			return component != null;
		})
		.map(function(component) {
			return component.text;
		})
		.join(" ");

		templateData.summarySentence = summarySentence;

		/*
		When displaying several hotels on a result list page, it is
		usually a bit boring to show the most frequent categories with
		each hotel. People will always talk about location, service and
		room a lot, and it is repetitive to see "great location"
		several times.

		Instead, we will make use of categories specific to the current filter
		as well as the "relevance" property, which is provided by TrustYou to find
		categories which set a hotel apart from other comparable hotels.

		Additionally, instead of a generic category name like "Great
		Location", we will use content from the "highlight_list"
		property. Highlights are quotes from actual customer reviews,
		which are much more unique and specific to the hotel, e.g.
		"Right next to Brandenburg Gate".
		*/

		
		// We first aggregate all categories into one list, 
		// to be able to loop through them easily. 
		// Start with top-level categories ...
		var categories = reviewSummary.category_list;
		// ... add all of their sub categories ...
		reviewSummary.category_list.forEach(function(category) {
			categories = categories.concat(category.sub_category_list);
		}); 

		var categoryDir = {};

		// ... and finally hotel types
		categories.concat(reviewSummary.hotel_type_list)
		// store them in an easily accessable way
		.forEach(function(cat) {
			categoryDir[cat.category_id] = cat
		})

		// find the current category
		var category = categoryDir[categoryId]

		// save the category name...
		templateData.categoryName = category.category_name

		// ... and hightlights
		var highlights = [];
		category.highlight_list.forEach(function(highlight) {
			highlights.push(highlight.text);
		});
		// if the category has subcategories, save their hightlights, too
		if (category.hasOwnProperty("sub_category_list")) {
			category.sub_category_list.forEach(function(subCategory) {
				subCategory.highlight_list.forEach(function(highlight) {
					highlights.push(highlight.text);
				});
			});
		}

		// we only want to show 3 highlights in total (of course you can show more)
		if (highlights.length < 3) {
			/*
			If the combined highlights of the category and subcategory
			together are less than 3, we will fill the remaining spots with
			highlights from our general category list of that hotel,
			which we sort by relevance first. We take only highlight per category,
			to not get repetitive.
			*/
			categories.sort(function(catA, catB) {
				return catB.relevance - catA.relevance;
			})
			.forEach(function(category) {
				if (category.highlight_list.length > 0) {
					/*
					If there are highlights for this category, pick
					the first one.
					*/
					var highlight = category.highlight_list[0].text;
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
		}


		// take the top three highlights
		templateData.highlights = highlights.slice(0, 3).map(
			function(highlight) {
				return {
					text: highlight
				};
			});

		// get some additional badges this hotel has
		// filter the badge list by the different badge types, remove the current badge
		// sort them, take the top 2
		// save all badges in the same format

		// there is only one summary badge, so no need to sort and slice here
		var summaryBadge = reviewSummary.badge_list.filter(
			function(badge) {
				return badge.badge_type === "ranking"
			})
		.map(
			function(badge) {
				var popularity = badge.badge_data.popularity.toFixed()
				return {
					badgeName: "Overall Rating",
					badgeRank: "Top " + popularity + "%",
				};
			});

		var htypeBadges = reviewSummary.badge_list.filter(
			function(badge) {
				return badge.badge_type === "hotel_type"
					&& badge.badge_data.category_id != categoryId
					&& categoryDir[badge.badge_data.category_id]
			})
		.sort(function(a, b) {
				return a.badge_data.popularity - b.badge_data.popularity;
			})
		.slice(0,2)
		.map(
			function(badge) {
				var popularity = badge.badge_data.popularity.toFixed()
				return {
					badgeName: categoryDir[badge.badge_data.category_id].category_name,
					badgeRank: "Top " + popularity + "%",
				};
			});

		var categoryBadges = reviewSummary.badge_list.filter(
			function(badge) {
				return badge.badge_type === "category"
					&& badge.badge_data.category_id != categoryId
			})
		.sort(function(a, b) {
				return a.badge_data.rank - b.badge_data.rank;
			})
		.slice(0,2)
		.map(
			function(badge) {
				return {
					badgeName: categoryDir[badge.badge_data.category_id].category_name,
					badgeRank: "#" + badge.badge_data.rank,
				};
			});

		//concatenate the three badge lists
		templateData["additionalBadges"] = summaryBadge.concat(htypeBadges).concat(categoryBadges)

		// render the template, and display the hotel
		var hotelRendered = Mustache.render(hotelTemplate, templateData);
		if (showAll){
			var identifier = "all"
		}
		else {
			var identifier = categoryId
		}
		$("#search-results-" + identifier).append(hotelRendered);
	}

	/**
	Process a response from the TrustYou Bulk API.
	*/
	function processApiResponse(data) {
		// hide spinner
		$("#spinner").hide();

		// check whether the bulk request was successful
		if (data.meta.code !== 200) {
			throw "Bulk request failed!";
		}
		var responses = data.response.response_list;
		var hotelsByType = {};
		var hotelsByCategory = {};
		responses.forEach(function(response, index) {
			// check whether the individual request was successful
			if (response.meta.code !== 200) {
				throw "Request failed!";
			}
			/*
			Responses are guaranteed to be in the same order as the
			request_list we passed earlier. Therefore, we can merge the
			response with our data by their index and add some context.
			*/
			var hotelData = hotels[index];
			/*
			Loop through the badge list, put the hotel into a list of badges
			for every category badge it has.
			*/
			response.response.badge_list.forEach(function(badge) {
				if (badge.badge_type == "category") {
					if (!hotelsByCategory.hasOwnProperty(badge.badge_data.category_id)) {
						hotelsByCategory[badge.badge_data.category_id] = [];
					}
					hotelsByCategory[badge.badge_data.category_id].push({
						rank: badge.badge_data.rank,
						response: response.response,
						hotelData: hotelData,
					});
				}
			});
			/*
			Do the same with the hotel type list to get these badges, too.
			// TOFIX: Once hotel type badges are guaranteed to be the same
			// as the hotel types, get them together with the categories in
			// the above loop through the badges.
			*/
			response.response.hotel_type_list.forEach(function(hotelType) {
				if (!hotelsByType.hasOwnProperty(hotelType.category_id)) {
					hotelsByType[hotelType.category_id] = [];
				}
				hotelsByType[hotelType.category_id].push({
					popularity: hotelType.popularity,
					response: response.response,
					hotelData: hotelData,
				});
			});
		});

		/*
		Now go through all hotel types, sort them by popularity and keep
		only the top 5. Then render them!
		*/
		for (var categoryId in hotelsByType) {

			hotelsByType[categoryId] = hotelsByType[categoryId]
			// sort by descending popularity
			.sort(function(a, b) {
				return a.popularity - b.popularity;
			})
			// take top 5
			.slice(0, 5);

			// Now render each hotel!
			hotelsByType[categoryId].forEach(function(hotel) {
				var hotelData = hotel.hotelData;
				var reviewSummary = hotel.response;
				var rank = "Top " + hotel.popularity.toFixed() + "%";
				renderHotel(hotelData, reviewSummary, categoryId, rank, false);
			});
		}

		/*
		Do the same for the category badges, but sort them by rank.
		There never are more than five badges per category, so no need to slice.
		*/
		for (var categoryId in hotelsByCategory) {
			hotelsByCategory[categoryId]
			.sort(function(a, b) {
				return a.rank - b.rank;
			})
			.forEach(function(hotel, index) {
				var rank = "#" + hotel.rank;
				renderHotel(hotel.hotelData, hotel.response, categoryId, rank, false);
			});
		}

		/*
		Render the "Best Mix" page. Take the top hotel from pre-defined
		lists of categories and hotel types.
		*/
		["111", "11e", "14c", "24", "201", "171", "131"].forEach(function(categoryId) {
			// pick the correct filter from the merged list
			if (hotelsByCategory[categoryId].length > 0) {
				// as we sorted the hotels above, we just take the first one here
				var topHotel = hotelsByCategory[categoryId][0];
				var hotelData = topHotel.hotelData;
				var reviewSummary = topHotel.response;
				renderHotel(hotelData, reviewSummary, categoryId, "#1", true);
			}
		});

		["16h", "16c", "16d", "16b"].forEach(function(categoryId) {
			// pick the correct filter from the merged list
			if (hotelsByType[categoryId].length > 0) {
				// as we sorted the hotels above, we just take the first one here
				var topHotel = hotelsByType[categoryId][0];
				var hotelData = topHotel.hotelData;
				var reviewSummary = topHotel.response;
				var rank = "Top " + topHotel.popularity.toFixed() + "%";
				renderHotel(hotelData, reviewSummary, categoryId, rank, true);
			}
		});
	}
})($, Mustache, i18n, lang);
