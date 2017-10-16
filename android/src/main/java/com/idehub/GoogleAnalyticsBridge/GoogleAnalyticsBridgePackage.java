package com.idehub.GoogleAnalyticsBridge;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class GoogleAnalyticsBridgePackage implements ReactPackage {

    public GoogleAnalyticsBridgePackage(IGTMProvider provider, String trackingId) {
        _provider = provider;
        _trackingId = trackingId;
    }

    public GoogleAnalyticsBridgePackage(String trackingId) {
        this(null, trackingId);
    }

    public GoogleAnalyticsBridgePackage() {
        this(null, null);
    }

    private IGTMProvider _provider = null;
    private String _trackingId;

    @Override
    public List<NativeModule> createNativeModules(
            ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();

        modules.add(new GoogleAnalyticsBridge(reactContext, _trackingId));
        modules.add(new GoogleTagManagerBridge(reactContext, _provider));

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
