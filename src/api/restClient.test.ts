import { restApiRequest } from "./restClient";

const fetchMock = jest.fn();

beforeEach(() => {
  global.fetch = fetchMock;
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("restClient tests", () => {
  test("return response which service called from rest client", async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: () => {
        return [
          { title: "Wake up at 5 am", _id: "1a", isArchived: false },
          { title: "Run for 2 kms", _id: "2b", isArchived: false },
        ];
      },
    });
    const response = await restApiRequest("/habits");
    expect(response).toEqual([
      { title: "Wake up at 5 am", _id: "1a", isArchived: false },
      { title: "Run for 2 kms", _id: "2b", isArchived: false },
    ]);
  });

  test("throw error with error msg if response is not ok", async () => {
    fetchMock.mockResolvedValue({
      ok: false,
      status: 500,
      json: () => {},
    });
    await expect(restApiRequest("/habits")).rejects.toThrow(
      "Request failed with status 500",
    );
  });

  test("throw error if service fails to run", async () => {
    fetchMock.mockRejectedValue(new Error("Internal server error"));
    await expect(restApiRequest("/habits")).rejects.toThrow(
      "Internal server error",
    );
  });

  test("throw error if service fails to run", async () => {
    fetchMock.mockRejectedValue("Internal server error");
    await expect(restApiRequest("/habits")).rejects.toBe(
      "Internal server error",
    );
  });
});
