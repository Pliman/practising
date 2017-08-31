package com.web.dwr;

import java.io.Serializable;
import java.util.List;

public class DwrResult implements Serializable {
	private static final long serialVersionUID = 1L;
	private List results;
	private int totalSize;
	private boolean success;

	public boolean isSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}

	public int getTotalSize() {
		return totalSize;
	}

	public void setTotalSize(int totalSize) {
		this.totalSize = totalSize;
	}

	public List getResults() {
		return results;
	}

	public void setResults(List results) {
		this.results = results;
	}
}