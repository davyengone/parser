var fs = require('fs'),
	xml2js = require('xml2js'),
	readline = require('readLine');

var parser = new xml2js.Parser();
parser.addListener('end', function(result) {
    console.dir(result);
    console.log('Done.');
});

// var map = [
// 	ASMod_numAirTempCatMod_C,
// 	ASMod_tBrickDsDfl_CA,
// 	ASMod_stOpModeMsk_CA,
// 	ExhMod_stSwtEomCatMdl_T,
// 	ASMod_dwMaxExoEngOut_C,
// 	ExhMod_rEGRThdCalExoLean_C,
// 	ASMod_swtLamDiffNSCCorOn_C,
// 	ASMod_dwMaxExoDSOx_X,
// 	ASMod_dwMaxExoDSOx_Y,
// 	ASMod_dwMaxExoDSOx_MAP,
// 	ASMod_dwMaxExoDNOx_X,
// 	ASMod_dwMaxExoDNOx_Y,
// 	ASMod_dwMaxExoDNOx_MAP,
// 	ASMod_facLimDiffNSCCor_X,
// 	ASMod_facLimDiffNSCCor_CUR,
// 	ASMod_numPipeCatUs_CA,
// 	ExhMod_facExhMnfDpnCor0_X, 
// 	ExhMod_facExhMnfDpnCor0_CUR,
// 	ExhMod_facExhMnfDpnCor1_X,
// 	ExhMod_facExhMnfDpnCor1_CUR,
// 	ExhMod_facExhMnfDpnCor2_X,
// 	ExhMod_facExhMnfDpnCor2_CUR,
// 	ASMod_facVelDpnCor0_X,
// 	ASMod_facVelDpnCor0_CUR,
// 	ASMod_facVelDpnCor1_X,
// 	ASMod_facVelDpnCor1_CUR,
// 	ASMod_facVelDpnCor2_X,
// 	ASMod_facVelDpnCor2_CUR,
// 	ASMod_swtSelMaxExoCat_CA,
// 	ASMod_numSelExoSlpCat_CA,
// 	ASMod_swtHCLdModOn_CA,
// 	ASMod_facCalValFl_C,
// 	ASMod_tiHCModPT1_CA,
// 	ASMod_swtSelTempHCLdMod_CA,
// 	ASMod_numSelTempHCLdMod_CA,
// 	ASMod_numSelTempHCLdSnsr_CA,
// 	ASMod_mHCLdCatMax_CA,
// 	ASMod_swtHCLdModDpdCrv_CA,
// 	ASMod_numCatSpecCrvIn_C,
// 	ASMod_facHCLdCatTemp0_X,
// 	ASMod_facHCLdCatTemp0_CUR,
// 	ASMod_facHCLdCatTemp1_X,
// 	ASMod_facHCLdCatTemp1_CUR,
// 	ASMod_facHCLdCatMsFlw0_X,
// 	ASMod_facHCLdCatMsFlw0_CUR,
// 	ASMod_facHCLdCatMsFlw1_X,
// 	ASMod_facHCLdCatMsFlw1_CUR,
// 	ASMod_facHCLdCatHCMs0_X,
// 	ASMod_facHCLdCatHCMs0_CUR,
// 	ASMod_facHCLdCatHCMs1_X,
// 	ASMod_facHCLdCatHCMs1_CUR,
// 	ASMod_facHCUnLdCatTemp0_X,
// 	ASMod_facHCUnLdCatTemp0_CUR,
// 	ASMod_facHCUnLdCatTemp1_X,
// 	ASMod_facHCUnLdCatTemp1_CUR,
// 	ASMod_swtSelTempBrickUs_CA,
// 	ASMod_numTempSensBrickUs_CA,
// 	ASMod_mBrick_CA,
// 	ASMod_arExchExtBrick_CA,
// 	ASMod_cpEGBrick_X,
// 	ASMod_cpEGBrick_CUR,
// 	ASMod_cpCatBrick0_X,
// 	ASMod_cpCatBrick0_CUR,
// 	ASMod_cpCatBrick1_X,
// 	ASMod_cpCatBrick1_CUR,
// 	ASMod_cpCatBrick2_X,
// 	ASMod_cpCatBrick2_CUR,
// 	ASMod_numBrickSpecCrvIn_C,
// 	ASMod_swtExoBrickCalcOff_C,
// 	ASMod_numCatOfsExo_C,
// 	ExhMod_idxBrickTSensFacExo_C,
// 	ExhMod_idxTSensFacExo_C,
// 	ASMod_facEffLeanExoTemp0_X,
// 	ASMod_facEffLeanExoTemp0_CUR,
// 	ASMod_facEffLeanExoTemp1_X,
// 	ASMod_facEffLeanExoTemp1_CUR,
// 	ASMod_facEffLeanExoTemp2_X,
// 	ASMod_facEffLeanExoTemp2_CUR,
// 	ASMod_facEffLeanExoMFl_X,
// 	ASMod_facEffLeanExoMFl_Y,
// 	ASMod_facEffLeanExoMFl_MAP,
// 	ASMod_dwMaxExoBrickCat0_X,
// 	ASMod_dwMaxExoBrickCat0_CUR,
// 	ASMod_dwMaxExoBrickCat1_X,
// 	ASMod_dwMaxExoBrickCat1_CUR,
// 	ASMod_dwMaxExoBrickCat2_X,
// 	ASMod_dwMaxExoBrickCat2_CUR,
// 	ASMod_swtOnOfsExo_C,
// 	ExhMod_facCorOSCExo_X,
// 	ExhMod_facCorOSCExo_CUR,
// 	ExhMod_swtLamDpdOSC_C,
// 	ExhMod_degyOSCExo_C,
// 	ExhMod_facFrctOSCLdCor_C,
// 	ExhMod_mRgbth_X,
// 	ExhMod_mRgbth_CUR,
// 	ExhMod_facEffOSC_X,
// 	ExhMod_facEffOSC_Y,
// 	ExhMod_facEffOSC_MAP,
// 	ASMod_numCatRefBrick_CA,
// 	ASMod_swtTempCatModOff_CA,
// 	ASMod_numTempOxiCatDs_CA,
// 	ASMod_numTempOxiCatSurf_CA,
// 	ASMod_tOxiCDfl_CA,
// 	ASMod_numOxiCat_CA,
// 	ASMod_dwEnvOxiCDfl_CA,
// 	ASMod_numTempPFltDs_C,
// 	ASMod_numTempPFltSurfSim_C,
// 	ASMod_numPFlt_C,
// 	ASMod_tPFltDfl_C,
// 	ASMod_dVolPFltDfl_C,
// 	ASMod_swtTempCatOut_CA,
// 	ASMod_numSelTempOutBrick_CA,
// 	ASMod_numSelTempOutSens_CA,
// 	ASMod_numSelTempOutSim_CA,
// 	ASMod_numPipeCatDs_CA,
// 	ASMod_numPipeCatUs_CA,
// 	ASMod_numEngTempNOxCor_C,
// 	ASMod_facLeanNOxTempEng0_X,
// 	ASMod_facLeanNOxTempEng0_CUR,
// 	ASMod_facLeanNOxTempEng1_X,
// 	ASMod_facLeanNOxTempEng1_CUR,
// 	ASMod_facLeanNOxTempEng2_X,
// 	ASMod_facLeanNOxTempEng2_CUR,
// 	ASMod_facLeanNOxTempEG0_X,
// 	ASMod_facLeanNOxTempEG0_CUR,
// 	ASMod_facLeanNOxTempEG1_X,
// 	ASMod_facLeanNOxTempEG1_CUR,
// 	ASMod_facLeanNOxTempEG2_X,
// 	ASMod_facLeanNOxTempEG2_CUR,
// 	ASMod_swtPresMidPFlt_C,
// 	ASMod_swtStrEGCatDsOff_C,
// 	ASMod_swtStrPresEGCatUsOff_C
// ];

var parse = function() {
	var filename = document.getElementById('file').value;


	fs.readFile(filename, 'utf-8', function(err, html) {
		
		var data = jQuery('a[name]', html);

		debugger;
		
	});


	// var reader = readline(filename);
	// reader.on('line', function(line){
	// 	document.getElementById('result').value = line;
	// 	if (map.indexOf()) {};
	// });

	// reader.on('error', function(line){
	// 	debugger;
	// });
}

