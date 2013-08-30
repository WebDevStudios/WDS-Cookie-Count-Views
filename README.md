WDS Cookie Count Views
======================

Counts user's pageviews in a cookie for use in ad targeting.

####Example use for Google DFP

	googletag
		.defineSlot('/XXXXXXX/SidebarHome', [320, 480], 'div-gpt-ad-XXXXXXXXXXXXX-X')
		.addService(googletag.pubads())
		.setTargeting("pageviews", wds_viewcount());


*In this example, `pageviews` needs to be a defined custom targeting key setup in DFP.*