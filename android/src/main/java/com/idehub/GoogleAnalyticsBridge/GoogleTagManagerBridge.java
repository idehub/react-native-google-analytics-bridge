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


    private final String E_CONTAINER_ALREADY_OPEN = "E_CONTAINER_ALREADY_OPEN";
    private final String E_ONGOING_OPEN_OPERATION = "E_ONGOING_OPEN_OPERATION";
    private final String E_CONTAINER_NOT_OPENED = "E_CONTAINER_NOT_OPENED";
    private final String E_OPEN_CONTAINER_FAILED = "E_OPEN_CONTAINER_FAILED";

    private ContainerHolder mContainerHolder;
    private Boolean openOperationInProgress = false;

    @Override
    public String getName() {
        return "GoogleTagManagerBridge";
    }

    @ReactMethod
    public void openContainerWithId(final String containerId, final Promise promise){
        if (mContainerHolder != null) {
            promise.reject(E_CONTAINER_ALREADY_OPEN, new Throwable("The container is already open."));
            return;
        }

        if (openOperationInProgress) {
            promise.reject(E_ONGOING_OPEN_OPERATION, new Throwable("Container open-operation already in progress."));
            return;
        }

        TagManager mTagManager = TagManager.getInstance(getReactApplicationContext());
        //using -1 here because it can't access raw in app
        openOperationInProgress = true;
        PendingResult<ContainerHolder> pending = mTagManager.loadContainerPreferFresh(containerId, -1);
        pending.setResultCallback(new ResultCallback<ContainerHolder>() {
            @Override
            public void onResult(ContainerHolder containerHolder) {
                if (containerHolder != null && containerHolder.getStatus().isSuccess()) {
                    mContainerHolder = containerHolder;
                    promise.resolve(true);
                } else {
                    promise.reject(E_OPEN_CONTAINER_FAILED, new Throwable(String.format("Failed to open container. Does container with id %s exist?", containerId)));
                }
                openOperationInProgress = false;
            }
        }, 2000, TimeUnit.MILLISECONDS);
    }

    @ReactMethod
    public void booleanForKey(final String key, final Promise promise){
        if (mContainerHolder != null && mContainerHolder.getContainer() != null) {
            promise.resolve(mContainerHolder.getContainer().getBoolean(key));
        } else {
            promise.reject(E_CONTAINER_NOT_OPENED, new Throwable("The container has not been opened. You must call openContainerWithId(..)"));
        }
    }

    @ReactMethod
    public void stringForKey(final String key, final Promise promise){
        if (mContainerHolder != null && mContainerHolder.getContainer() != null) {
            promise.resolve(mContainerHolder.getContainer().getString(key));
        } else {
            promise.reject(E_CONTAINER_NOT_OPENED, new Throwable("The container has not been opened. You must call openContainerWithId(..)"));
        }
    }

    @ReactMethod
    public void doubleForKey(final String key, final Promise promise){
        if (mContainerHolder != null && mContainerHolder.getContainer() != null) {
            promise.resolve(mContainerHolder.getContainer().getDouble(key));
        } else {
            promise.reject(E_CONTAINER_NOT_OPENED, new Throwable("The container has not been opened. You must call openContainerWithId(..)"));
        }
    }
}