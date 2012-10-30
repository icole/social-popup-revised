<?php
/*
 Plugin Name: Social PopUP - Google+, Facebook and Twitter popup
 Plugin URI: http://www.masquewordpress.com/plugins/social-popup/
 Version: 1.2
 Description: This plugin will display a popup or splash screen when a new user visit your site showing a Google+, twitter and facebook follow links. This will increase you followers ratio in a 40%. Popup will be close depending on your settings. Check readme.txt for full details.
 Author: Damian Logghe
 Author URI: http://www.masquewordpress.com
 */

class socialPopup 
{
	function __construct() {
		
        
        add_action( 'admin_init', array(&$this,'register_options' ));
		
		add_action( 'init',array(&$this,'load_scripts' ) );

	}
	
	function load_scripts()
	{
		if(!is_admin())
		{		
			wp_enqueue_script('spu-fb', 'http://connect.facebook.net/en_US/all.js#xfbml=1', array('jquery'),FALSE,FALSE);
			wp_enqueue_script('spu-tw', 'http://platform.twitter.com/widgets.js', array('jquery'),FALSE,FALSE);
			wp_enqueue_script('spu-go', 'https://apis.google.com/js/plusone.js', array('jquery'),FALSE,FALSE);
			wp_enqueue_script('spu', plugins_url( 'spu.js' , __FILE__ ),array('jquery'));
			wp_enqueue_style('spu-css', plugins_url( 'spu.css' , __FILE__ ));
		}
	}

	//function that register options 
 	function register_options()
	{
		register_setting( 'spu_options', 'spu_option' );	
	}
	
} //end of class


$social_pop_up = new socialPopup();

function add_social_popup($atts)
{					
	extract(shortcode_atts(array('company' => 'default', 'title' => 'Please support the site', 'message' => 'By clicking any of these buttons you help our site to get better', 'closeable' => 'false', 'advclose' => 'false', 'twitter' => 'false', 'twuser' => '','pintrest' => 'false','ptuser' => '','facebook' => 'false','fburl' => '','google' => 'false', 'gplusurl' => ''),$atts));

	$popup = '<script type="text/javascript"> 										
				jQuery(document).ready(function() {							
					jQuery().delay("1500").socialPopUP({
						company:"'. $company . '",
						title:"' . $title . '",
						message:"' . $message . '",
						closeable:' . $closeable . ',
						advancedClose:' . $advclose . ',
						opacity: "0.75",
						tw_enabled:' . $twitter . ',
						twitter_user:"' . $twuser . '",
						pt_enabled:' . $pintrest . ',
						pt_user:"' . $ptuser . '",
						fb_enabled:' . $facebook . ',
						fb_url:"' . $fburl . '",
						go_enabled:' . $google . ',
						go_url:"' . $gplusurl . '",
						days_no_click: "10",
						credits: false		
					});			
				});
							
		</script>';

	return $popup;
}

add_shortcode('social-popup', 'add_social_popup');