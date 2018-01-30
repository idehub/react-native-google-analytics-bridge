package com.idehub.GoogleAnalyticsBridge;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableMapKeySetIterator;
import com.google.android.gms.common.api.PendingResult;
import com.google.android.gms.common.api.ResultCallback;
import com.google.android.gms.tagmanager.ContainerHolder;
import com.google.android.gms.tagmanager.DataLayer;
import com.google.android.gms.tagmanager.TagManager;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

public class GoogleTagManagerBridge extends ReactContextBaseJavaModule {

    public GoogleTagManagerBridge(ReactApplicationContext reactContext, ContainerHolder containerHolder) {
        super(reactContext);
        mContainerHolder = containerHolder;
    }


    private final String E_CONTAINER_ALREADY_OPEN = "E_CONTAINER_ALREADY_OPEN";
    private final String E_ONGOING_OPEN_OPERATION = "E_ONGOING_OPEN_OPERATION";
    private final String E_CONTAINER_NOT_OPENED = "E_CONTAINER_NOT_OPENED";
    private final String E_OPEN_CONTAINER_FAILED = "E_OPEN_CONTAINER_FAILED";
    private final String E_PUSH_EVENT_FAILED = "E_PUSH_EVENT_FAILED";

    private ContainerHolder mContainerHolder;
    private Boolean openOperationInProgress = false;
    private DataLayer mDatalayer;

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

    @ReactMethod
    public void pushDataLayerEvent(ReadableMap dictionary, final Promise promise){

      if (mContainerHolder != null && isValidMapToPushEvent(dictionary)) {
          getDataLayer().push(ConvertReadableToMap.getMap(dictionary));
          promise.resolve(true);
      } else {
          if (mContainerHolder == null) {
              promise.reject(E_CONTAINER_NOT_OPENED, new Throwable("The container has not been opened. You must call openContainerWithId(..)"));
          } else {
              promise.reject(E_PUSH_EVENT_FAILED, new Throwable("Validation error, data must have a key \"event\" with valid event name"));
          }
      }
    }
    
    @ReactMethod
    public void setVerboseLoggingEnabled(final Boolean enabled, final Promise promise){
        TagManager mTagManager = TagManager.getInstance(getReactApplicationContext());
        mTagManager.setVerboseLoggingEnabled(enabled);
        promise.resolve(true);
    }

    private boolean isValidMapToPushEvent(ReadableMap dictionary) {
        return (dictionary != null && dictionary.getString("event") != null
                && dictionary.getString("event").length() > 0);
    }

    private DataLayer getDataLayer() {
        if (mDatalayer == null) {
            TagManager tagManager = TagManager.getInstance(getReactApplicationContext());
            mDatalayer = tagManager.getDataLayer();
        }
        return mDatalayer;
    }



}
