package com.idehub.GoogleAnalyticsBridge;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.google.android.gms.tagmanager.ContainerHolder;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class GoogleAnalyticsBridgePackage implements ReactPackage {

    public GoogleAnalyticsBridgePackage(ContainerHolder containerHolder, String trackingId) {
        _containerHolder = containerHolder;
        _trackingId = trackingId;
    }

    public GoogleAnalyticsBridgePackage(String trackingId) {
        this(null, trackingId);
    }

    public GoogleAnalyticsBridgePackage() {
        this(null, null);
    }

    private ContainerHolder _containerHolder = null;
    private String _trackingId;

    @Override
    public List<NativeModule> createNativeModules(
            ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();

        modules.add(new GoogleAnalyticsBridge(reactContext, _trackingId));
        modules.add(new GoogleAnalyticsSettings(reactContext));
        modules.add(new GoogleTagManagerBridge(reactContext, _containerHolder));
        
        return modules;
    }

    // Deprecated from RN 0.47.0
    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Arrays.<ViewManager>asList();
    }
}
