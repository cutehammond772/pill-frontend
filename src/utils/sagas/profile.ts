import { all, fork, put, race, take } from "redux-saga/effects";
import { apiGet } from "../other/request";

import { ReducerActionTypes as AuthActionTypes } from "../reducers/auth";
import { InternalActions as internal } from "../reducers/profile";

import { instance } from "./auth";
import * as config from "../../config";
import { ProfileData } from "../../components/profile/profile.avatar";

const profileFlow = function* () {
  while (true) {
    const { reset, authorize, unauthorize } = yield race({
      reset: take(AuthActionTypes.RESET),
      authorize: take(AuthActionTypes.AUTHORIZE),
      unauthorize: take(AuthActionTypes.UNAUTHORIZE),
    });

    if (!!reset || !!unauthorize) {
      yield put(internal.setToAnonymous());
    }

    if (!!authorize) {
      try {
        const user: Required<ProfileData> = yield apiGet<Required<ProfileData>>(
          instance,
          config.API_USER_PROFILE
        );

        yield put(internal.setToUser({ ...user }));
        console.log("[Profile] Loaded profile successfully.");
      } catch (ex) {
        yield put(internal.setToAnonymous());
        console.log("[Profile] Failed loading profile.");
      }
    }
  }
};

export default function* profileSaga() {
  yield all([fork(profileFlow)]);
}
