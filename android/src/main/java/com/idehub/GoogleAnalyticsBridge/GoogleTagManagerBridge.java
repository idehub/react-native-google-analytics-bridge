package com.idehub.GoogleAnalyticsBridge;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.google.android.gms.common.api.PendingResult;
import com.google.android.gms.common.api.ResultCallback;
import com.google.android.gms.tagmanager.ContainerHolder;
import com.google.android.gms.tagmanager.TagManager;

import java.util.concurrent.TimeUnit;

public class GoogleTagManagerBridge extends ReactContextBaseJavaModule {
   
    public GoogleTagManagerBridge(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    private ContainerHolder mContainer;
    private Boolean openOperationInProgress = false;

    @Override
    public String getName() {
        return "GoogleTagManagerBridge";
    }

    @ReactMethod
    public void openContainerWithId(final String containerId, final Promise promise){
        if (!openOperationInProgress && mContainer != null) {
            TagManager mTagManager = TagManager.getInstance(getReactApplicationContext());
            //using -1 here because it can't access raw in app
            openOperationInProgress = true;
            PendingResult<ContainerHolder> pending = mTagManager.loadContainerPreferNonDefault(containerId, -1);
            pending.setResultCallback(new ResultCallback<ContainerHolder>() {
                @Override
                public void onResult(ContainerHolder containerHolder) {
                    mContainer = containerHolder;
                    promise.resolve(true);
                    openOperationInProgress = false;
                }
            }, 1000, TimeUnit.MILLISECONDS);
        } else {
            promise.reject("The container is either open, or open-operation is in progress");
        }
    }

    @ReactMethod
    public void booleanForKey(final String key, final Promise promise){
        if (mContainer != null) {
            promise.resolve(mContainer.getContainer().getBoolean(key));
        } else {
            promise.reject("The container has not been opened. You must call openContainerWithId(..)");
        }
    }

    @ReactMethod
    public void stringForKey(final String key, final Promise promise){
        if (mContainer != null) {
            promise.resolve(mContainer.getContainer().getString(key));
        } else {
            promise.reject("The container has not been opened. You must call openContainerWithId(..)");
        }
    }

    @ReactMethod
    public void doubleForKey(final String key, final Promise promise){
        if (mContainer != null) {
            promise.resolve(mContainer.getContainer().getDouble(key));
        } else {
            promise.reject("The container has not been opened. You must call openContainerWithId(..)");
        }
    }
}