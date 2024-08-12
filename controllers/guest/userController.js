import { connect } from "../../utils/database.connection.js";

async function checkRecord(record) {
  try {
    const connections = [connect(2024), connect(2025), connect(2026)];
    const results = await Promise.all(
      connections.map((connection) =>
        connection.then((conn) => conn.checkRecord(record))
      )
    );

    const isMatch = results.every((match) => match);
    if (isMatch) {
      const connection2024 = await connections[0];
      const role = await connection2024.getRole(record);
      const batch = await connection2024.getBatch(record);
      return { success: true, role, batch };
    } else {
      return { success: false };
    }
  } catch (error) {
    console.error("Error checking record:", error);
    return { success: false };
  }
}
