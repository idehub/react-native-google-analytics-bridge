package com.idehub.GoogleAnalyticsBridge;

import com.google.android.gms.tagmanager.ContainerHolder;
import com.google.android.gms.tagmanager.DataLayer;

public interface IGTMProvider {
  ContainerHolder getContainerHolder();

  DataLayer getDataLayer();
}
