import { restApiRequest } from "../api/restClient";
import { createHabit, getAllHabits, updateHabit } from "./habitService";

jest.mock("../api/restClient", () => ({
  restApiRequest: jest.fn(),
}));
const mockRestApiRequest = jest.mocked(restApiRequest);

describe("habitService tests", () => {
  test("getAllHabits should return an array of habits", async () => {
    mockRestApiRequest.mockResolvedValue([
      { _id: "1", title: "Drink water", isArchived: false },
      { _id: "2", title: "Exercise", isArchived: true },
    ]);
    const habits = await getAllHabits();
    expect(Array.isArray(habits)).toBe(true);
    expect(habits).toHaveLength(2);
  });

  test("createHabit should create a new habit and return the updated list of habits", async () => {
    mockRestApiRequest.mockResolvedValue([
      { _id: "1", title: "Drink water", isArchived: false },
      { _id: "2", title: "Exercise", isArchived: true },
      { _id: "3", title: "Read a book", isArchived: false },
    ]);
    const updatedHabits = await createHabit("Read a book");
    expect(Array.isArray(updatedHabits)).toBe(true);
    expect(updatedHabits).toHaveLength(3);
  });

  test("updateHabit should update an existing habit and return the updated list of habits", async () => {
    mockRestApiRequest.mockResolvedValue([
      { _id: "1", title: "Drink water editted", isArchived: false },
      { _id: "2", title: "Exercise", isArchived: true },
      { _id: "3", title: "Read a book", isArchived: false },
    ]);
    const updatedHabits = await updateHabit("1", {
      title: "Drink water editted",
      isArchived: true,
    });
    expect(Array.isArray(updatedHabits)).toBe(true);
    expect(updatedHabits).toHaveLength(3);
    expect(updatedHabits[0].title).toBe("Drink water editted");
  });
});
