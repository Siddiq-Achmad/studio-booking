import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useEffect } from "react";
import { useState } from "react";

export default function TableUser() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  if (loading) {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-6 text-center">Table Users</h1>
        <Skeleton className="w-full h-40" />
      </div>
    );
  }

  if (!users) {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-6 text-center">Table Users</h1>
        <p>No users found.</p>
      </div>
    );
  }

  useEffect(() => {
    setLoading(true);
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/users");
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
    setLoading(false);
    console.log(users);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Users List</h1>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Verified</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="text-right">Referral</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users &&
            users.map(
              (user: {
                id: string;
                name: string;
                email: string;
                image: string;
                role: string;
                referralCode: string;
                emailVerified: string;
              }) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img
                        className="rounded-full"
                        src={user.image}
                        width={40}
                        height={40}
                        alt={user.name}
                      />
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <span className="mt-0.5 text-xs text-muted-foreground">
                          {user.email}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {user.emailVerified ? (
                      <Badge variant="outline">Verified</Badge>
                    ) : (
                      <Badge variant="destructive">Not Verified</Badge>
                    )}
                  </TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell className="text-right">
                    {user.referralCode}
                  </TableCell>
                </TableRow>
              )
            )}
        </TableBody>
      </Table>
      <p className="mt-4 text-right text-sm text-muted-foreground">
        Table Users
      </p>
    </div>
  );
}
