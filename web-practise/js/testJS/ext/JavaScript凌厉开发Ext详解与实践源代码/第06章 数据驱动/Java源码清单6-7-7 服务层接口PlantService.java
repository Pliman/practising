package com.web.dwr;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class PlantService {
	public DwrResult queryPlants(Map map) {
		List list = new ArrayList();
		for (int i = 0, ilen = 50; i < ilen; i++) {
			Plant plant = new Plant();
			plant.setPlantId(i);
			plant.setCommon("Bloodroot");
			plant.setBotanical("");
			plant.setLight("Shade");
			plant.setPrice("2.00");
			plant.setAvailability("03/15/06");
			plant.setIndoor("true");
			list.add(plant);
		}

		DwrResult dwrResult = new DwrResult();
		dwrResult.setTotalSize(list.size());
		dwrResult.setSuccess(true);
		dwrResult.setResults(list);

		return dwrResult;
	}

	public DwrResult savePlant(Plant plant) {
		System.out.println("plant.getCommon()." + plant.getCommon());
		/*
		 * 您的业务方法,
		 */
		// ServiceImpl.savePlant(plant);
		DwrResult dwrResult = new DwrResult();
		// 保存成将后将返回结果的success设为true
		dwrResult.setSuccess(true);
		return dwrResult;
	}
}