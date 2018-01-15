<?php 

function write_data_to_file( $filename ) {
	$json = file_get_contents( 'https://api.bitvalor.com/v1/ticker.json');
	$time = time();
	file_put_contents( $filename, $json );
}
$filename = 'data.json';
if ( file_exists( $filename ) ) {
	$file_time = filemtime( $filename );
	$expire = 60; // Time in seconds to cache the file for
	if ( $file_time < ( time() - $expire ) ) {
		// if expired, overwrite file
		write_data_to_file( $filename );
	}
} else {
	// if file does not exist, write to file
	write_data_to_file( $filename );
}
header('Content-Type: application/json');
$file_data = file_get_contents( $filename );
echo $file_data;

?>